// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Archivo_Black, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Miłosz Tkacz",
  description: "Notes on consciousness, philosophy, and code.",
};

const archivoBlack = Archivo_Black({ weight: "400", variable: "--font-archivob", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ weight: ["400", "500", "700"], variable: "--font-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`theme ${archivoBlack.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
