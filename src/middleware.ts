import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = req.cookies.get("token")?.value || "";

  // if the user is logged in (i.e. has a token with a non empty value)
  // and the path is public
  // => we redirect them to their profile page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl));
  }

  // if the user is not logged in (the token does not exist or has an empty value)
  // and the path is private
  // => we redirect them to the login page
  if (!(isPublicPath || token)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

// read next docs for more info on this
// this matcher array specifies the paths that middleware runs on
//
// the :path* syntax means that we match the profile path and any of its subroutes
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};
