import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Footer } from "./components/ui/footer";
import { CMS_NAME } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <section className="min-h-screen">
          {children}
          <Footer />
        </section>
      </body>
    </html>
  );
}
