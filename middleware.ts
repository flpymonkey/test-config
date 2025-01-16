import { NextRequest, NextResponse } from 'next/server';
import Mux from '@mux/mux-node';
import { serialize } from 'cookie';

// Following this guide for signing JWTs:
// https://www.mux.com/docs/guides/signing-jwts

const mux = new Mux();

async function createTokens(playbackId: string) {
  const baseOptions = {
    keyId: process.env.MUX_SIGNING_KEY_ID!, // Use environment variables for security
    keySecret: process.env.MUX_SIGNING_KEY_SECRET!, // Use environment variables for security
    expiration: '1d', // E.g 60, "2 days", "10h", "7d", numeric value interpreted as seconds
  };

  const videoToken = await mux.jwt.signPlaybackId(playbackId, { ...baseOptions, type: 'video' });
  console.log('video token', videoToken);

  return videoToken;
}

// Using this:
// https://www.geeksforgeeks.org/middlewares-in-next-js/

export async function middleware(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    // Get URL parameters
    const url = new URL(req.url);
    const tagId = url.searchParams.get('tagId');
    const eCode = url.searchParams.get('eCode');
    const enc = url.searchParams.get('e');
    const cmac = url.searchParams.get('c');
    const playbackId = url.searchParams.get('playbackId');

    if (tagId && eCode && enc && cmac && playbackId) {
        // Perform the API call
        const res = await fetch(
            'https://third-party.etrnl.app/v1/tags/verify-authenticity',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // For this I added the secret directly in AWS Paramter Store, then use it in flightcontrol.json
                    'API-KEY': process.env.ETRNL_KEY! 
                },
                body: JSON.stringify({ tagId, eCode, enc, cmac })
            }
        );

        const { success, exists, authentic, ctr, uid, err } = await res.json();

        // Handle the response and set the playback token
        if (success) {
            const token = await createTokens(playbackId);
        
            const response = NextResponse.redirect(new URL('/success', req.url));

            response.headers.set('Set-Cookie', serialize('muxToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                sameSite: 'strict',
                path: '/',
            }));

            response.headers.set('Set-Cookie', serialize('playbackId', playbackId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                sameSite: 'strict',
                path: '/',
            }));

            return response;
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
