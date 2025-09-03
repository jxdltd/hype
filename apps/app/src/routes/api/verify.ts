import { and, db, eq } from "@repo/database";
import { emailVerification, prospect } from "@repo/database/schema";
import { redirect } from "@tanstack/react-router";
import { createServerFileRoute } from "@tanstack/react-start/server";
import z from "zod";

const paramsSchema = z.object({
  id: z.uuid(),
  code: z.uuid(),
});

export const ServerRoute = createServerFileRoute("/api/verify").methods({
  GET: async ({ request }) => {
    const params = paramsSchema.parse(
      Object.fromEntries(new URL(request.url).searchParams)
    );

    const found = await db.query.emailVerification.findFirst({
      where: and(
        eq(emailVerification.prospectId, params.id),
        eq(emailVerification.code, params.code)
      ),
    });

    if (!found) {
      return new Response("Not Found", { status: 404 });
    }

    if (found.expiresAt < new Date()) {
      return new Response("Expired", { status: 400 });
    }

    await db
      .update(prospect)
      .set({ emailVerified: true })
      .where(eq(prospect.id, found.prospectId));

    return redirect({
      to: "/verified",
    });
  },
});
