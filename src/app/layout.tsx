import type { Metadata, Viewport } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: {
    default: "CoachPRB",
    template: "%s | CoachPRB",
  },
  description: "CoachPRB",
  applicationName: "CoachPRB",
  keywords: [
    "CoachPRB",
    "تدريب رياضي",
    "كمال أجسام",
    "كوتش",
  ],
  authors: [{ name: "CoachPRB" }],
  creator: "CoachPRB",
  publisher: "CoachPRB",
  metadataBase: new URL("https://coachprb.vercel.app"),
  openGraph: {
    title: "CoachPRB",
    description: "CoachPRB",
    url: "https://coachprb.vercel.app",
    siteName: "CoachPRB",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoachPRB",
    description: "CoachPRB",
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
    "name": "CoachPRB",
    "url": "https://coachprb.vercel.app",
    "logo": "https://coachprb.vercel.app/brand-pr-logo.png",
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
      </body>
    </html>
  );
}
