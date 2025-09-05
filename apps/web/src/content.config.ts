import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

const guides = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/guides",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
  }),
});

export const collections = { updates, guides };
