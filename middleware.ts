import { NextRequest, NextResponse } from 'next/server';

// Using this:
// https://www.geeksforgeeks.org/middlewares-in-next-js/

export async function middleware(req: NextRequest): Promise<NextResponse> {
    // Get URL parameters
    const url = new URL(req.url);
    const argA = url.searchParams.get('argA');
    const argB = url.searchParams.get('argB');

    if (argA === "gfg" && argB === "123") {
        return NextResponse.redirect(new URL('/success', req.url));    
    } else {
        return new NextResponse(
            `<h1>Invalid argA & argB</h1>`,
            {
                status: 401,
                headers: { 'Content-Type': 'text/html' }
            }
        );
    }
}

export const config = {
    matcher: '/test/:path*',
}

