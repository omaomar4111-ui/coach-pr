import type { Metadata, Viewport } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";
import DeviceTracker from "@/components/DeviceTracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: {
    default: "CoachPR",
    template: "%s | CoachPR",
  },
  description: "CoachPR",
  applicationName: "CoachPR",
  keywords: [
    "CoachPR",
    "تدريب رياضي",
    "كمال أجسام",
    "كوتش",
  ],
  authors: [{ name: "CoachPR" }],
  creator: "CoachPR",
  publisher: "CoachPR",
  metadataBase: new URL("https://coachpr.vercel.app"),
  openGraph: {
    title: "CoachPR",
    description: "CoachPR",
    url: "https://coachpr.vercel.app",
    siteName: "CoachPR",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoachPR",
    description: "CoachPR",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/brand-pr-logo.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: [
      { url: "/brand-pr-logo.png", type: "image/png" }
    ],
    shortcut: ["/brand-pr-logo.png"]
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0918",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CoachPR",
    "url": "https://coachpr.vercel.app",
    "logo": "https://coachpr.vercel.app/brand-pr-logo.png",
    "description": "منصة التدريب الرياضي وكمال الأجسام الأولى في مصر والشرق الأوسط.",
    "sameAs": [
      "https://www.instagram.com"
    ]
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${tajawal.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-tajawal bg-[#0e0918] text-white antialiased">
        {children}
        <PwaInstallPrompt />
        <DeviceTracker />
      </body>
    </html>
  );
}
