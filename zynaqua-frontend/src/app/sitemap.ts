
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zynaqua.vercel.app";

  const routes = [
    "",
    "/about",
    "/products",
    "/amc",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route === "/products" ? 0.9 : 0.7,
  }));
}
