import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/start";
import { formOpts, formSchema } from "./options";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { getFormData } from "@tanstack/react-form/start";
import { db } from "@repo/database";
import { project } from "@repo/database/schema";
import { getAuth } from "../../../auth";
import { redirect } from "@tanstack/react-router";

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
    try {
      const validatedData = await serverValidate(ctx.data);
      console.log("validatedData", validatedData);

      await db
        .insert(project)
        .values({
          id,
          name: validatedData.name,
          userId: auth.user.id,
        })
        .returning();
    } catch (e) {
      if (e instanceof ServerValidateError) {
        // Log form errors or do any other logic here
        // return e.response;
        return "Problem";
      }

      // Some other error occurred when parsing the form
      console.error(e);
      setResponseStatus(500);
      return "There was an internal error";
    }

    return redirect({ to: "/projects/$id", params: { id } });
  });

export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
  async () => {
    return getFormData();
  }
);
