// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://www.buildhype.dev",

  devToolbar: {
    enabled: false,
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Geist Mono",
        cssVariable: "--font-geistmono",
      },
      {
        provider: fontProviders.fontsource(),
        name: "Geist",
        cssVariable: "--font-geist",
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap(), react()],
});
