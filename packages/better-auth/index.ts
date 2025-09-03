import type { BetterAuthPlugin } from "better-auth";
import { createAuthMiddleware } from "better-auth/plugins";

type HypePluginOptions = {
  apiKey: string;
};

export const hypePlugin = (options: HypePluginOptions) =>
  ({
    id: "hypePlugin",
    hooks: {
      before: [
        {
          matcher: (ctx) => ctx.path.startsWith("/sign-up/email"),
          handler: createAuthMiddleware(async (ctx) => {
            const { email } = ctx.body;

            console.log("Email", email);
            console.log(
              "Encoded Email",
              encodeURI(`http://localhost:3000/api/access/${email}`)
            );

            const response = await fetch(
              encodeURI(`http://localhost:3000/api/access/${email}`),
              {
                headers: {
                  "x-api-key": options.apiKey,
                },
              }
            );

            console.log(response);
            if (!response.ok) {
              throw new Error("No access");
            }

            return { context: ctx };
          }),
        },
      ],
    },
  } satisfies BetterAuthPlugin);
