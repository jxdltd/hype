import { db, eq } from "@repo/database";
import { emailVerification, prospect } from "@repo/database/schema";
import { resend } from "@repo/mail";
import { VerifyEmail } from "@repo/mail/emails/verify-email";
import { inngest } from "../client";

export const verifyEmail = inngest.createFunction(
  { id: "verify-email" },
  { event: "prospect/created" },
  async ({ event }) => {
    const found = await db.query.prospect.findFirst({
      where: eq(prospect.id, event.data.prospect.id),
      with: {
        project: true,
      },
    });

    if (!found) {
      throw new Error("Prospect not found");
    }

    const code = crypto.randomUUID();
    await db.insert(emailVerification).values({
      id: crypto.randomUUID(),
      code,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      prospectId: found.id,
    });

    await resend.emails.send({
      from: "Hype <no-reply@updates.buildhype.dev>",
      to: found.email,
      subject: "Verify Email",
      react: (
        <VerifyEmail
          project={found.project}
          verification={{ code }}
          prospect={{ id: found.id }}
        />
      ),
    });

    return { success: true };
  }
);
