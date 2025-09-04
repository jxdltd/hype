import { hypePlugin } from "@buildhype/better-auth";
import { db } from "@repo/database";
import * as schema from "@repo/database/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [
    reactStartCookies(),
    hypePlugin({ apiKey: "123", allowedEmails: ["x@jxd.dev"] }),
  ],
});
