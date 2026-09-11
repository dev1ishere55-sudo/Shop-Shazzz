import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { TelegramProvider } from "@/context/TelegramContext";
import AppShell from "@/components/AppShell";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shop Shazzz — Curated retail. For the cool kids.",
  description:
    "Curated retail from Nigeria. In-stock pieces that ship now, plus hand-picked finds sourced just for you. Keffi · Abuja · Kaduna · Jos.",
  openGraph: {
    title: "Shop Shazzz",
    description: "Curated retail. For the cool kids.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FBF9F4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Telegram WebApp SDK */}
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TelegramProvider>
          <CartProvider>
            <AppShell>{children}</AppShell>
          </CartProvider>
        </TelegramProvider>
      </body>
    </html>
  );
}
