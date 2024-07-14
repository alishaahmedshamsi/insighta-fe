import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const privatePaths = [
    "/profile",
    "/school-admin",
    "/sup-admin",
    "/teacher-dashboard",
    "/student-dashboard",
    // "/reset-password",
  ];

  const isPrivatePath = privatePaths.includes(path);
  const token = request.cookies.get("accessToken")?.value;

 
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
