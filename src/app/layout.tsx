import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, DM_Sans, Space_Mono, Syne, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";
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

const siteUrl = new URL("https://vedanco.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Vedanco | One Platform. Six Expert Agencies.",
    template: "%s | Vedanco",
  },
  description: "IT Services, AI & Automation, Digital Marketing, Personal Branding, US Recruitment, Podcast Production.",
  keywords: [
    "Vedanco",
    "AI automation",
    "IT services",
    "digital marketing",
    "personal branding",
    "recruitment",
    "podcast production",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vedanco | One Platform. Six Expert Agencies.",
    description: "IT Services, AI & Automation, Digital Marketing, Personal Branding, US Recruitment, Podcast Production.",
    url: siteUrl,
    siteName: "Vedanco",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Vedanco logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedanco | One Platform. Six Expert Agencies.",
    description: "IT Services, AI & Automation, Digital Marketing, Personal Branding, US Recruitment, Podcast Production.",
    images: ["/images/logo.png"],
  },
};

export const viewport = {
  themeColor: "#080C14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable} ${syne.variable} ${spaceGrotesk.variable} antialiased font-sans bg-primary text-primary flex flex-col min-h-screen`}
      >
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}', { anonymize_ip: true });`}
            </Script>
          </>
        ) : null}
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
