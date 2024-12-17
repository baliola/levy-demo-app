import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
// import Negotiator from "negotiator";
// import { match } from "@formatjs/intl-localematcher";

let locales = ["en", "id"];
// let defaultLocale = "en";
const ignoredExtensions = ['.jpg', '.png', '.css', '.js', '.svg', '.ico'];

// Get the preferred locale, similar to the above or using a library
// function getLocale(request: NextRequest) {
//   const acceptLang = request.headers.get("Accept-Language");
//   if (!acceptLang) return defaultLocale;
//   const headers = { "accept-language": acceptLang };
//   const languages = new Negotiator({ headers }).languages();
//   return match(languages, locales, defaultLocale);
// }

export function middleware(request: NextRequest): void | NextResponse {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathname.startsWith('/images/')) {
    return NextResponse.next(); // Bypass locale processing
  }

  if (ignoredExtensions.some(ext => pathname.endsWith(ext))) {
    return NextResponse.next(); // Bypass the middleware
  }

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = request.cookies.get('locale')?.value ?? 'en';
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
