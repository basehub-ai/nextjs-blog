import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies } from "next/headers";
import { basehub } from "basehub";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: Request, locales: string[], defaultLocale: string) {
  const languages = new Negotiator({
    headers: Object.fromEntries(request.headers),
  }).languages();
  try {
    return match(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  console.time("query to basehub");
  const variants = (
    await basehub().query({
      sets: {
        languages: {
          variants: {
            apiName: true,
            isDefault: true,
          },
        },
      },
    })
  ).sets.languages.variants;
  console.timeEnd("query to basehub");

  const locales = variants.map((v) => v.apiName);
  const defaultLocale = variants.find((v) => v.isDefault)?.apiName ?? "en";

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const cookieManager = await cookies();
  const localeFromCookies =
    cookieManager.get("preferred-locale")?.value || defaultLocale;
  // Redirect if there is no locale
  const locale = getLocale(request, locales, localeFromCookies);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
