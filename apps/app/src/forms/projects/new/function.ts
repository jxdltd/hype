import { db } from "@repo/database";
import { project } from "@repo/database/schema";
import { createServerValidate, getFormData } from "@tanstack/react-form/start";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getAuth } from "../../../auth";
import { formOpts, formSchema } from "./options";

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: formSchema,
});

export const handleForm = createServerFn({
  method: "POST",
})
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Error("Invalid form data");
    }
    return data;
  })
  .handler(async (ctx) => {
    const auth = await getAuth();

    if (!auth) {
      throw new Error("No auth found");
    }

    const id = crypto.randomUUID();
    const validatedData = await serverValidate(ctx.data);

    await db
      .insert(project)
      .values({
        id,
        name: validatedData.name,
        userId: auth.user.id,
      })
      .returning();

    throw redirect({ to: "/projects/$id", params: { id } });
  });

export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
  async () => {
    return getFormData();
  }
);
