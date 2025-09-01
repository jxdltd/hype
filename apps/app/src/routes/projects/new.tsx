import { createFileRoute } from "@tanstack/react-router";
import {
  getFormDataFromServer,
  handleForm,
} from "../../forms/projects/new/function";
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import { formOpts } from "../../forms/projects/new/options";

export const Route = createFileRoute("/projects/new")({
  component: RouteComponent,
  loader: async () => ({
    state: await getFormDataFromServer(),
  }),
});

function RouteComponent() {
  const { state } = Route.useLoaderData();
  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  console.log(formErrors);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-50">
      <form
        action={handleForm.url}
        method="post"
        encType={"multipart/form-data"}
        className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-neutral-200 w-full max-w-md"
      >
        <form.Field name="name">
          {(field) => {
            return (
              <div>
                <input
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 rounded-md border border-neutral-200"
                />
                {field.state.meta.errors.map((error) => (
                  <p
                    className="text-red-500 text-sm font-medium"
                    key={error as unknown as string}
                  >
                    {error?.message}
                  </p>
                ))}
              </div>
            );
          }}
        </form.Field>
        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
          ]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full p-2 rounded-md border border-neutral-200"
            >
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
