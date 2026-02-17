import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Space_Mono, Syne, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vedanco | One Platform. Six Expert Agencies.",
  description: "IT Services, AI & Automation, Digital Marketing, Personal Branding, US Recruitment, Podcast Production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable} ${syne.variable} ${spaceGrotesk.variable} antialiased font-sans bg-primary text-primary flex flex-col min-h-screen`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
