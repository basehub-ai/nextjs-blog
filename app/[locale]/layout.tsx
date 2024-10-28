import { Toolbar } from "basehub/next-toolbar";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Footer from "../components/footer";
import { CMS_NAME } from "@/lib/constants";
import "../globals.css";
import { LanguageSelect } from "../components/language-select";
import { LanguagesEnum } from "@/.basehub/schema";

export const metadata: Metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LanguagesEnum }>;
}>) {
  const { locale } = await params;
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Toolbar />
        <main className="min-h-screen">
          <header className="container mx-auto px-5 mt-10">
            <LanguageSelect locale={locale} />
          </header>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
