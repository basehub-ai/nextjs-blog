import { NextRequest, NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { cookies } from "next/headers";

const locales = ['en', 'es' , 'pt']
const DEFAULT = 'en'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: Request, defaultLocale = DEFAULT) { 
  const languages = new Negotiator({headers: Object.fromEntries(request.headers)}).languages()
  try {
    return match(languages, locales, defaultLocale) 
  } catch {
    return defaultLocale
  }
}

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const cookieManager = await cookies()
  const localeFromCookies = cookieManager.get('preferred-locale')?.value 
  console.log({localeFromCookies})
  // Redirect if there is no locale
  const locale = getLocale(request, localeFromCookies)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next).*)'],
}