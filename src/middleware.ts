import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import User from "./models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";
  // const admin = request.cookies.get("admin")?.value || "";
  // if (path === "/admin" && admin === "") {
  //   return NextResponse.redirect(new URL("/problems", request.nextUrl));
  // }
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/problems",
    "/problems/:path*",
    "/admin",
    "/login",
    "/signup",
    "/verifyemail",
  ],
};
