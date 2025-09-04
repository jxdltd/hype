import { db } from "@repo/database";
import { prospect } from "@repo/database/schema";
import { formOptions, useForm } from "@tanstack/react-form";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { authenticatedMiddleware } from "~/auth";

const formSchema = z.object({
  email: z.email(),
});

const actionSchema = formSchema.extend({
  projectId: z.string(),
});

const formOpts = formOptions({
  defaultValues: {
    email: "",
  },
  validators: {
    onChange: formSchema,
  },
});

const createProspect = createServerFn()
  .validator(actionSchema)
  .middleware([authenticatedMiddleware])
  .handler(async ({ data }) => {
    const id = crypto.randomUUID();
    await db
      .insert(prospect)
      .values({ id, email: data.email, projectId: data.projectId });

    return { id };
  });

type Props = {
  projectId: string;
};

export function NewProspect({ projectId }: Props) {
  const form = useForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      createProspect({ data: { ...value, projectId: projectId } });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex items-center gap-2 p-1 rounded-md border border-neutral-200"
    >
      <form.Field name="email">
        {(field) => (
          <input
            type="email"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            className="text-sm focus:outline-none ml-1"
            placeholder="jamie@example.com"
          />
        )}
      </form.Field>
      <form.Subscribe selector={(state) => [state.isSubmitting]}>
        {([isSubmitting]) => (
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-xs font-medium bg-zinc-900 text-white px-2 py-1 rounded-md"
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
