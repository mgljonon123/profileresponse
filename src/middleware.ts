import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicPaths = ["/saerch","/"];

const staticPaths = ["/_next", "/favicon.ico", "/images", "/api/public"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow static files and public API routes
  if (staticPaths.some((staticPath) => path.startsWith(staticPath))) {
    return NextResponse.next();
  }

  // Check if the path is public
  const isPublicPath = publicPaths.some((publicPath) =>
    path.startsWith(publicPath)
  );

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value;

  // Verify the token
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

  // Redirect logic
  if (isPublicPath && isAuthenticated) {
    // If user is authenticated and tries to access login/register, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !isAuthenticated) {
    // If user is not authenticated and tries to access protected route, redirect to login
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
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
