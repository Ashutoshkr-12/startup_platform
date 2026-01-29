import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/pricing",
  "/contact-us",
];

const AUTH_PAGES = ["/login", "/register"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Block protected pages
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/api/claims")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow public routes
    return NextResponse.next();
  }


  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: string;
      email: string;
      verified: boolean;
    };

    if (AUTH_PAGES.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

  } catch (err) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("token");
    return res;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/api/claims/:path*",
    "/api/auth/me",
  ],
};
