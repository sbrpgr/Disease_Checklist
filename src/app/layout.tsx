import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "질환 체크리스트";

export const metadata: Metadata = {
  title: `${siteName} | 근거 기반 암 자가진단`,
  description: "13개 암종의 초기증상과 위험요인을 바탕으로 자가점검을 제공합니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adSense = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="ko">
      <body>
        {adSense ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSense}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <Header />
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
        <Footer />
        <DisclaimerBanner />
      </body>
    </html>
  );
}
