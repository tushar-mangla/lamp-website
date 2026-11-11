import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Search and AI-answer crawlers are allowed so the brand can be found and cited.
// Until SITE_URL is set (real domain), everything is disallowed so previews aren't indexed.
export default function robots(): MetadataRoute.Robots {
  if (!site.isLive) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended", "Bingbot"], allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
