import { env as database } from "@repo/database/env";
import { createEnv } from "@t3-oss/env-core";

export const env = () =>
  createEnv({
    extends: [database()],
    server: {},
    runtimeEnv: {},
  });
