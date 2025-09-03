import { db, eq } from "@repo/database";
import { prospect, publicKey } from "@repo/database/schema";
import { inngest } from "@repo/jobs/client";
import { createServerFileRoute } from "@tanstack/react-start/server";
import z from "zod";

const bodySchema = z.object({
  email: z.email(),
});

// CORS headers helper
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key",
  "Access-Control-Max-Age": "86400",
};

export const ServerRoute = createServerFileRoute("/api/waitlist").methods({
  OPTIONS: () => {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  },
  POST: async ({ request }) => {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey) {
      return new Response("Unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const body = bodySchema.parse(await request.json());

    const found = await db.query.publicKey.findFirst({
      where: eq(publicKey.key, apiKey),
    });

    if (!found) {
      return new Response("Unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    const id = crypto.randomUUID();
    await db.insert(prospect).values({
      id,
      email: body.email,
      projectId: found.projectId,
    });

    await inngest.send({
      name: "prospect/created",
      data: {
        prospect: {
          id,
        },
      },
    })

    return new Response("OK", {
      headers: corsHeaders,
    });
  },
});
