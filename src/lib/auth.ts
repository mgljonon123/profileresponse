import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export interface UserJwtPayload {
  userId: string;
  email: string;
  subscriptionTier: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getAuthUser(): Promise<UserJwtPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Type assertion with validation
    if (
      typeof payload === "object" &&
      payload !== null &&
      "userId" in payload &&
      "email" in payload &&
      "subscriptionTier" in payload
    ) {
      return {
        userId: payload.userId as string,
        email: payload.email as string,
        subscriptionTier: payload.subscriptionTier as string,
        iat: payload.iat as number,
        exp: payload.exp as number,
      };
    }

    return null;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getAuthUser();
  return !!user;
}

export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}

export async function getSubscriptionTier(): Promise<string> {
  const user = await getAuthUser();
  return user?.subscriptionTier || "FREE";
}

export async function isSubscribed(): Promise<boolean> {
  const tier = await getSubscriptionTier();
  return tier !== "FREE";
}
