import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicPaths = ["/saerch", "/work","/home"];

const staticPaths = ["/_next", "/favicon.ico", "/images", "/api/public"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (staticPaths.some((staticPath) => path.startsWith(staticPath))) {
    return NextResponse.next();
  }

  const isPublicPath = publicPaths.some((publicPath) =>
    path.startsWith(publicPath)
  );

  const token = request.cookies.get("token")?.value;

  let isAuthenticated = false;
  try {
    if (token) {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "your-secret-key"
      );
      await jwtVerify(token, secret);
      isAuthenticated = true;
    }
  } catch (error) {
    isAuthenticated = false;
  }

  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
