import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

export async function middleware (request) {
  const jwt = request.cookies.get('myTokenName')

  if (jwt === undefined) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const cookie = jwt.value
    const { payload } = await jwtVerify(cookie, new TextEncoder().encode('secret'))
    console.log(payload)
    return NextResponse.next()
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard', '/']
}