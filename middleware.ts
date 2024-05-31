import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/"];

  const privatePaths = [
    "/profile",
    "/school-admin",
    "/sup-admin",
    "/teacher-dashboard",
    "/student-dashboard",
    "/school-admin/create-class",
  ];

  const isPublicPath = publicPaths.includes(path);
  const isPrivatePath = privatePaths.includes(path);
  const token = request.cookies.get("accessToken")?.value;

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/school-admin",
    "/sup-admin",
    "/teacher-dashboard",
    "/student-dashboard",
  ],
};
