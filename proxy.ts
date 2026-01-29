import { NextRequest, NextResponse } from "next/server";


const AUTH_PAGES = ["/login", "/register"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token");
  //console.log(token)

  if (token?.value === undefined) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/api/claims") ||
      pathname.startsWith("/deals") 
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow public routes
    return NextResponse.next();
  }

  try {
   
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
    "/deals/:path*",
    "/login",
    "/register",
    "/api/claims/:path*",
    "/api/auth/me",
  ],
};
