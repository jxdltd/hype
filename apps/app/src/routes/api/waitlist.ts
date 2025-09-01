import { db, eq } from "@repo/database";
import { publicKey } from "@repo/database/schema";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/api/waitlist").methods({
  //   GET: ({ request }) => {
  //     return auth.handler(request);
  //   },
  POST: async ({ request }) => {
    // validate api key
    // parse body
    // insert into waitlist
    // return 200

    const apiKey = request.headers.get("x-api-key");

    if (!apiKey) {
      return new Response("Unauthorized", { status: 401 });
    }

    const found = await db.query.publicKey.findFirst({
      where: eq(publicKey.key, apiKey),
    });

    if (!found) {
      return new Response("Unauthorized", { status: 401 });
    }

    console.log("HELLO WORLD");

    return new Response("OK");
  },
});
