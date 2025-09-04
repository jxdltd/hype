import { env as config } from "@repo/config/env";
import { env as database } from "@repo/database/env";
import { env as mail } from "@repo/mail/env";
import { createEnv } from "@t3-oss/env-core";

export const env = () =>
  createEnv({
    extends: [database(), mail(), config()],
    clientPrefix: "VITE_",
    server: {},
    client: {},
    runtimeEnv: {},
  });
