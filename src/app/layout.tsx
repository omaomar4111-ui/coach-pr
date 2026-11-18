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
    default: "CoachPRB — سجّل رقمك. غيّر جسمك",
    template: "%s | CoachPRB",
  },
  description:
    "CoachPRB: المنصة الاحترافية الأولى للمدربين والرياضيين في الشرق الأوسط. إدارة المتدربين، تصميم الخطط التدريبية والغذائية، وفحص التكنيك الرياضي وحماية المفاصل.",
  applicationName: "CoachPRB",
  keywords: [
    "CoachPRB",
    "تدريب رياضي",
    "كمال أجسام",
    "كوتش أونلاين",
    "دايت وجداول تمارين",
    "Form Check",
    "سجّل رقمك غيّر جسمك",
  ],
  authors: [{ name: "CoachPRB Team" }],
  creator: "CoachPRB",
  publisher: "CoachPRB",
  metadataBase: new URL("https://coachprb.vercel.app"),
  openGraph: {
    title: "CoachPRB — سجّل رقمك. غيّر جسمك",
    description:
      "المنصة الاحترافية الأولى للمدربين والرياضيين. جداول تمارين، تغذية دقيقة، وحماية كاملة للمفاصل.",
    url: "https://coachprb.vercel.app",
    siteName: "CoachPRB",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoachPRB — سجّل رقمك. غيّر جسمك",
    description:
      "المنصة الاحترافية الأولى للمدربين والرياضيين في مصر والشرق الأوسط.",
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
