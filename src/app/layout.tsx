import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Sürücü PWA - VERO",
  description: "Araç yönetim uygulaması",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0284c7" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <TopBar />
        <main className="max-w-md sm:max-w-lg md:max-w-xl mx-auto pb-20">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
