import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { policies } from "@/lib/policies";

const LAST_MODIFIED = "2026-11-11";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/lamp", "/gifts/christmas", "/corporate-gifting", "/our-story", "/faq", "/contact", ...Object.keys(policies).map((s) => `/policies/${s}`)];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: p === "" || p === "/lamp" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/lamp" ? 0.9 : 0.6,
  }));
}
