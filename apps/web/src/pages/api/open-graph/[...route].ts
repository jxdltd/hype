import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const updates = await getCollection("updates");

const updatePages = updates.map((update) => ({
  [update.id]: {
    title: update.data.title,
    description: update.data.description,
  },
}));

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",

  pages: {
    home: {
      title: "Hype",
      description: "Pre-launch toolkit for developers",
    },
    ...updatePages,
  },

  // For each page, this callback will be used to customize the OpenGraph image.
  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    // logo: {
    //   path: "./src/assets/logo.png",
    //   size: [100],
    // },
  }),
});
