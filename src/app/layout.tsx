import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CoachPRB — سجّل رقمك. غيّر جسمك. — The Next Level of Online Coaching",
  description: "ابعت خطة التمرين والدايت لعميلك في تطبيق بدل الـ PDF، وتابعه كل أسبوع من مكان واحد.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="changa_4c9d147c-module__hpPt_W__variable barlow_condensed_1cab9ff4-module__V-zrxq__variable inter_8a594245-module__h1XLeG__variable">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Changa:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
