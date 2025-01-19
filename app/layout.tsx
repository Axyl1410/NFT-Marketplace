import ScrollToTop from "@/components/common/scroll-to-top";
import { ThemeProvider } from "@/components/theme/theme-context";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThirdwebProvider } from "thirdweb/react";
import "./globals.scss";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Generative Hub App",
  description: "Generative Hub App: Powered by Forma NFTs",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV === "production") console.log = () => {};

  return (
    <html lang="en">
      <body
        className={cn(
          `bg-background text-text antialiased transition-colors duration-300 ease-out dark:bg-background-dark dark:text-text-dark`,
          geistSans.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider>
          <ScrollToTop />
          <Toaster closeButton richColors position="top-left" />
          <NextUIProvider>
            <ThirdwebProvider>{children}</ThirdwebProvider>
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
