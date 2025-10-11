import { db } from "@repo/database";
import { project } from "@repo/database/schema";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getAuth } from "../../../auth";
import { formSchema } from "./options";

export const createProject = createServerFn({
  method: "POST",
})
  .inputValidator(formSchema)
  .handler(async ({ data }) => {
    const auth = await getAuth();

    if (!auth) {
      throw new Error("No auth found");
    }

    const id = crypto.randomUUID();

    await db
      .insert(project)
      .values({
        id,
        name: data.name,
        userId: auth.user.id,
      })
      .returning();

    throw redirect({ to: "/projects/$id", params: { id } });
  });
