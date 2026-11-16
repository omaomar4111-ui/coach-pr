import type { Metadata } from "next";
import "./globals.css";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";

export const metadata: Metadata = {
  title: "PR Agent - أسطول الذكاء الاصطناعي للتجارة الإلكترونية وخدمة العملاء",
  description: "المنصة الرائدة لأتمتة خدمة العملاء، تحويل تعليقات إنستجرام لمبيعات بالرسائل المباشرة، وتدقيق تحويلات إنستاباي بالرؤية البصرية",
  manifest: "/manifest.json",
  themeColor: "#8052ff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PR Agent"
  },
  icons: {
    icon: "/pr-logo.png",
    shortcut: "/pr-logo.png",
    apple: "/pr-logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="changa_4c9d147c-module__hpPt_W__variable barlow_condensed_1cab9ff4-module__V-zrxq__variable inter_8a594245-module__h1XLeG__variable">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Changa:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
