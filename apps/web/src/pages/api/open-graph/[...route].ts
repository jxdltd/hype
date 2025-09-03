import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const updates = await getCollection("updates");

const pages = Object.fromEntries(
  updates.map(({ id, data }) => [`updates/${id}`, data])
);

console.log(pages);

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",

  pages: {
    home: {
      title: "Hype",
      description: "Pre-launch toolkit for developers",
    },
    ...pages,
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
