import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Navigation from './constants/navigation';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get('accessToken')?.value;
  const urlVerify = `${process.env.NEXT_PUBLIC_MAIN_URL}auth/verify-token`;

  if (request.url == new URL(Navigation.login, request.url).toString()) {
    if (token) {
      try {
        await fetch(urlVerify, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });

        return NextResponse.redirect(new URL(Navigation.dashboard, request.url));
      } catch (err) {
        console.error(err, 'ada')
        const response = NextResponse.next();

        response.cookies.set('accessToken', '', {
          maxAge: 0,
          path: '/'
        });
      
        return response;
      }
    }

    return NextResponse.next();
  } else {
    if (!token) {
      return NextResponse.redirect(new URL(Navigation.login, request.url));
    }
    
    try {
      const response = await fetch(urlVerify, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });

      if (response.status !== 200) throw Error
      else return NextResponse.next();
    } catch (err) {
      const response = NextResponse.redirect(new URL(Navigation.login, request.url));

      response.cookies.set('accessToken', '', {
        maxAge: 0,
        path: '/'
      });
    
      return response;
    }
  }
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/project',
    '/auth/login'
  ],
};