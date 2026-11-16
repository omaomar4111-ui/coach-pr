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
    default: "PR Agent — منصة خدمة العملاء والتجارة الذكية بالذكاء الاصطناعي",
    template: "%s | PR Agent",
  },
  description:
    "PR Agent: منصة متكاملة لخدمة العملاء بالذكاء الاصطناعي، فحص المدفوعات البصرية، إدارة الأوردرات عبر CRM Pipeline، وأتمتة الردود عبر WhatsApp و Instagram.",
  applicationName: "PR Agent",
  keywords: [
    "PR Agent",
    "خدمة العملاء",
    "الذكاء الاصطناعي",
    "واتساب",
    "إنستجرام",
    "التجارة الإلكترونية",
    "CRM",
    "Egypt E-commerce",
  ],
  authors: [{ name: "PR Agent Team" }],
  creator: "PR Agent",
  publisher: "PR Agent",
  metadataBase: new URL("https://pr-agent-ai.vercel.app"),
  openGraph: {
    title: "PR Agent — منصة خدمة العملاء الذكية",
    description:
      "أتمتة خدمة العملاء، فحص مدفوعات إنستاباي، وإدارة الأوردرات بضغطة زر.",
    url: "https://pr-agent-ai.vercel.app",
    siteName: "PR Agent",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PR Agent — منصة خدمة العملاء الذكية",
    description:
      "أتمتة خدمة العملاء، فحص مدفوعات إنستاباي، وإدارة الأوردرات بضغطة زر.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/pr-logo.png",
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
    "name": "PR Agent",
    "url": "https://pr-agent-ai.vercel.app",
    "logo": "https://pr-agent-ai.vercel.app/pr-logo.png",
    "description": "منصة خدمة العملاء والتجارة الذكية بالذكاء الاصطناعي في الشرق الأوسط ومصر.",
    "sameAs": [
      "https://www.facebook.com",
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
