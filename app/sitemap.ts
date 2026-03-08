import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog-data"
import { docsArticles } from "@/lib/docs-articles"
import { libraryArticles } from "@/lib/library-data"
import { getSiteUrl } from "@/lib/seo"

const baseUrl = getSiteUrl()

const staticRoutes = [
  "",
  "/about",
  "/contact",
  "/support",
  "/status",
  "/changelog",
  "/roadmap",
  "/privacy",
  "/terms",
  "/cookies",
  "/data-usage",
  "/overview",
  "/search",
  "/market-score",
  "/top-data",
  "/areas",
  "/developers",
  "/properties",
  "/markets",
  "/reports/library",
  "/reports/generated",
  "/library",
  "/library/reports",
  "/library/insights",
  "/library/contracts-explained",
  "/blog",
  "/docs",
  "/docs/articles",
  "/docs/documentation",
  "/docs/partners-apis",
  "/docs/data-information",
  "/docs/industry",
  "/docs/careers-intern",
  "/docs/investors-relations",
  "/investor-relations",
  "/careers",
  "/media",
  "/plans",
  "/pricing",
  "/reports",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }))

  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const docsArticleEntries = docsArticles.map((article) => ({
    url: `${baseUrl}/docs/articles/${article.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  const libraryEntries = libraryArticles.map((article) => ({
    url: `${baseUrl}/library/${article.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries, ...docsArticleEntries, ...libraryEntries]
}
