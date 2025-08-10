import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ráječko z oblaků",
  description: "360° panoramatické fotografie z Ráječka, malebné vesnice v České republice.",
  keywords: ["Ráječko", "panoramatické fotografie", "360°", "Czech Republic"],
  authors: [{ name: "Molenusaczech" }],
  creator: "Molenusaczech",
  openGraph: {
    title: "Ráječko z oblaků",
    description: "Prozkoumejte panoramatické fotografie z Ráječka ve 360°.",
    url: "https://pano.mole.lol",
    siteName: "Ráječko z oblaků",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ráječko z oblaků",
    description: "Prozkoumejte panoramatické fotografie z Ráječka ve 360°.",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      <html lang="en" className="h-full">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        >
          {children}
        </body>
      </html>
    </>
  );
}
