// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Archivo_Black } from "next/font/google";

export const metadata: Metadata = {
  title: "My App",
  description: "A tidy Next.js starter layout",
};

const archivoBlack = Archivo_Black({weight: "400", variable: "--font-archivob"});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`theme ${archivoBlack.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
