import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS.name}: ${BUSINESS.tagline}`,
    short_name: BUSINESS.name,
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#f0c500",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
