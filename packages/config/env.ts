import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = () =>
  createEnv({
    clientPrefix: "VITE_",
    client: {
      VITE_DOCS_URL: z.url(),
    },
    runtimeEnv: {
      VITE_DOCS_URL: import.meta.env.VITE_DOCS_URL,
    },
  });
