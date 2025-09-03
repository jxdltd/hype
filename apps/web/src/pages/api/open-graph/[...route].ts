import { OGImageRoute } from "astro-og-canvas";

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",

  pages: {
    home: {
      title: "Hype",
      description: "Pre-launch toolkit for developers",
    },
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
