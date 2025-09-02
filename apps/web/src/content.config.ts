import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const updates = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/updates",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
  }),
});

export const collections = { updates };
