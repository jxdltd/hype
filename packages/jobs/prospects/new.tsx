import { db, eq } from "@repo/database";
import { prospect } from "@repo/database/schema";
import { resend } from "@repo/mail";
import { NewProspectEmail } from "@repo/mail/emails/new-prospect";
import { inngest } from "../client";

export const newProspect = inngest.createFunction(
  { id: "new-prospect" },
  { event: "prospect/created" },
  async ({ event, step }) => {
    const found = await db.query.prospect.findFirst({
      where: eq(prospect.id, event.data.prospect.id),
      with: {
        project: {
          with: {
            user: true,
          },
        },
      },
    });

    if (!found) {
      throw new Error("Prospect not found");
    }

    await resend.emails.send({
      from: "Hype <prospects@updates.buildhype.dev>",
      to: found.project.user.email,
      subject: "New Prospect",
      react: <NewProspectEmail project={found.project} prospect={found} />,
    });

    return { success: true };
  }
);
