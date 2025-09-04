import { db } from "@repo/database";
import { project } from "@repo/database/schema";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { getAuth } from "./auth";

const createProjectSchema = z.object({
  name: z.string().min(1),
});

export const createProject = createServerFn()
  .validator(createProjectSchema)
  .handler(async ({ data }) => {
    const auth = await getAuth(); // todo middleware

    if (!auth) {
      throw new Error("Unauthorized");
    }

    const id = crypto.randomUUID();

    await db.insert(project).values({
      id,
      name: data.name,
      userId: auth.user.id,
    });

    return { id };
  });
