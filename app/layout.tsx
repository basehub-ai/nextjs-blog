import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "./components/ui/footer";
import { CMS_NAME } from "@/lib/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <section className="min-h-screen">
          {children}
          <Footer />
        </section>
      </body>
    </html>
  );
}
