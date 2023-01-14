import { NextResponse } from "next/server";

export function middleware(request) {

  const jwt = request.cookies.get('myTokenName')

  if (request.nextUrl.pathname.includes('dashboard')) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next();
}