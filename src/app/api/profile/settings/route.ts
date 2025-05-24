import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = (await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )) as { payload: JWTPayload };

    if (!payload.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        fullname: true,
        nickname: true,
        email: true,
        profilePicture: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = (await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )) as { payload: JWTPayload };

    if (!payload.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const profilePicture = formData.get("profilePicture") as File | null;

    // Fetch current user data
    const currentUser = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { fullname: true, nickname: true },
    });

    let fullname = formData.get("fullname") as string | null;
    let nickname = formData.get("nickname") as string | null;
    const email = formData.get("email") as string | null;

    if (!fullname) fullname = currentUser?.fullname || "";
    if (!nickname) nickname = currentUser?.nickname || "";

    // Handle profile picture upload
    let profilePictureUrl = null;
    if (profilePicture) {
      // Convert the file to base64
      const bytes = await profilePicture.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      const mimeType = profilePicture.type;
      profilePictureUrl = `data:${mimeType};base64,${base64}`;
    }

    // Only include email if it's a non-empty string
    const updateData: any = {
      fullname,
      nickname,
      ...(profilePictureUrl && { profilePicture: profilePictureUrl }),
    };
    if (email && email.trim() !== "") {
      updateData.email = email;
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: payload.userId },
        data: updateData,
      });

      return NextResponse.json({
        success: true,
        data: {
          fullname: updatedUser.fullname,
          nickname: updatedUser.nickname,
          email: updatedUser.email,
          profilePicture: updatedUser.profilePicture,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        // Prisma unique constraint failed
        return NextResponse.json(
          { error: "This email is already in use." },
          { status: 400 }
        );
      }
      console.error("Error updating profile:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
