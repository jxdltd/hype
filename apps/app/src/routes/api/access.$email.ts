import { and, db, eq } from "@repo/database";
import { prospect, publicKey } from "@repo/database/schema";
import { inngest } from "@repo/jobs/client";
import { createServerFileRoute } from "@tanstack/react-start/server";
import z from "zod";

// CORS headers helper
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key",
  "Access-Control-Max-Age": "86400",
};

export const ServerRoute = createServerFileRoute("/api/access/$email").methods({
  OPTIONS: () => {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  },
  GET: async ({ request, params }) => {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey) {
      return new Response("Unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }

    // todo: validate api key
    // const found = await db.query.publicKey.findFirst({
    //   where: eq(publicKey.key, apiKey),
    // });

    // if (!found) {
    //   return new Response("Unauthorized", {
    //     status: 401,
    //     headers: corsHeaders,
    //   });
    // }

    const projectId = "133c36f2-9f9a-4fa5-966e-7e51ca955952";

    const foundProspect = await db.query.prospect.findFirst({
      where: and(
        eq(prospect.email, params.email),
        eq(prospect.projectId, projectId)
      ),
      with: {
        project: true,
      },
    });

    if (!foundProspect) {
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    }

    if (!foundProspect.accessGranted) {
      return new Response("Access Denied", {
        status: 403,
        headers: corsHeaders,
      });
    }

    return new Response("OK", {
      headers: corsHeaders,
    });
  },
});
