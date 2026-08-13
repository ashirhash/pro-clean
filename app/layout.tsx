import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const urbanist = Urbanist({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Pro Clean Bristol | Professional Cleaning Services in Bristol",
  description:
    "Pro Clean Bristol offers reliable, professional home and office cleaning services across Bristol. Book trusted local cleaners today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${urbanist.variable}`}>
      <body className="text-ink antialiased">{children}</body>
    </html>
  );
}
