import { and, db, eq } from "@repo/database";
import { project, publicKey } from "@repo/database/schema";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { getAuth } from "./auth";

const schema = z.object({
  projectId: z.string(),
});

type Schema = z.infer<typeof schema>;

export const createPublicKey = createServerFn()
  .validator((body: Schema) => schema.parse(body))
  .handler(async ({ data }) => {
    const auth = await getAuth();

    if (!auth) {
      throw new Error("Unauthorized");
    }

    const foundProject = await db.query.project.findFirst({
      where: and(
        eq(project.id, data.projectId),
        eq(project.userId, auth.user.id)
      ),
    });

    if (!foundProject) {
      throw new Error("Project not found");
    }

    const apiKey = crypto.randomUUID();

    await db.insert(publicKey).values({
      id: apiKey,
      key: apiKey,
      projectId: foundProject.id,
    });

    return apiKey;
  });
