import type { Metadata } from "next";
import type { Cancer } from "@/types/cancer";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "질환 체크리스트";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

export function generateCancerMetadata(cancer: Cancer): Metadata {
  return {
    title: `${cancer.name} 초기증상 자가진단 체크리스트 | ${siteName}`,
    description: `${cancer.name} 초기증상과 위험요인을 근거 기반으로 확인하세요.`,
    keywords: [`${cancer.name} 초기증상`, `${cancer.name} 자가진단`, `${cancer.name} 체크리스트`],
    alternates: {
      canonical: `${siteUrl}/cancers/${cancer.slug}`,
    },
    openGraph: {
      title: `${cancer.name} 초기증상 자가진단 | ${siteName}`,
      description: cancer.description,
      url: `${siteUrl}/cancers/${cancer.slug}`,
      locale: "ko_KR",
      type: "website",
      siteName,
    },
  };
}

export function getSiteUrl() {
  return siteUrl;
}
