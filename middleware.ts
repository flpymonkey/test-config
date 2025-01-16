import { NextRequest, NextResponse } from 'next/server';

// Using this:
// https://www.geeksforgeeks.org/middlewares-in-next-js/

export async function middleware(req: NextRequest): Promise<NextResponse> {
    // Get URL parameters
    const url = new URL(req.url);
    const tagId = url.searchParams.get('tagId');
    const eCode = url.searchParams.get('eCode');
    const enc = url.searchParams.get('e');
    const cmac = url.searchParams.get('c');

    if (tagId && eCode && enc && cmac) {
        // Perform the API call
        const res = await fetch(
            'https://third-party.etrnl.app/v1/tags/verify-authenticity',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': process.env.ETRNL_KEY!
                },
                body: JSON.stringify({ tagId, eCode, enc, cmac })
            }
        );

        const { success, exists, authentic, ctr, uid, err } = await res.json();

        // Handle the response from the API call
        if (success) {
            return NextResponse.redirect(new URL('/success', req.url));
        } else {
            return new NextResponse(
                `<h1>ETRNL API Call Failed</h1><p>Error: ${err}</p>`,
                {
                    status: 401,
                    headers: { 'Content-Type': 'text/html' }
                }
            );
        }
    } else {
        const params = Array.from(url.searchParams.entries()).map(([key, value]) => `${key}: ${value}`).join(', ');
        return new NextResponse(
            `<h1>Missing required arguments</h1><p>Received arguments: ${params}</p>`,
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

