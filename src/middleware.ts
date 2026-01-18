import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl, auth: session } = req;
    const isLoggedIn = !!session?.user;
    const isAdmin = session?.user?.role === "ADMIN";

    // Redirect admin users from /dashboard to /admin
    if (isLoggedIn && isAdmin && nextUrl.pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/admin", nextUrl));
    }

    // Redirect non-admin users from /admin to /dashboard
    if (isLoggedIn && !isAdmin && nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
