import type { MetadataRoute } from "next";
import { getAllCancers } from "@/data/cancers";
import { newsItems } from "@/data/news";
import { getSiteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticPages = ["", "/cancers", "/symptom-check", "/screening", "/news", "/about", "/privacy", "/terms", "/contact", "/disclaimer"];

  return [
    ...staticPages.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...getAllCancers().map((cancer) => ({
      url: `${siteUrl}/cancers/${cancer.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...newsItems.map((item) => ({
      url: `${siteUrl}/news/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
