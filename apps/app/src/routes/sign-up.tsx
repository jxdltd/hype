import { auth } from "@repo/auth/client";
import { IconLoader } from "@tabler/icons-react";
import { type AnyFieldApi, formOptions, useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import z from "zod";
import logo from "~/assets/logo.png?url";

const formSchema = z.object({
  email: z.email("Provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const formOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
});

function FieldError({ field }: { field: AnyFieldApi }) {
  if (field.state.meta.isValid) {
    return null;
  }

  console.log(field.state.meta.errors);

  return (
    <p className="text-red-500 text-xs font-medium">
      {field.state.meta.errors.map((error) => (
        <span key={error as unknown as string}>{error?.message}</span>
      ))}
    </p>
  );
}

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const form = useForm({
    ...formOpts,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await auth.signUp.email({
        email: value.email,
        name: value.email,
        password: value.password,
      });

      await router.navigate({ to: "/" });
    },
  });

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen bg-neutral-50">
      <img src={logo} alt="Hype" className="h-5" />
      <form
        className="bg-white border border-neutral-200 p-4 rounded-xl w-full max-w-md shadow-xs flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-sm text-neutral-500">
                Email
              </label>
              <input
                id={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="w-full p-2 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="jamie@example.com"
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-sm text-neutral-500">
                Password
              </label>
              <input
                id={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="w-full p-2 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="********"
              />
              <FieldError field={field} />
            </div>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <button
              type="submit"
              className="w-full p-2 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <IconLoader className="animate-spin size-4" />
              ) : (
                "Sign Up"
              )}
            </button>
          )}
        </form.Subscribe>
      </form>
      <p className="text-sm text-neutral-500">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-blue-500">
          Sign In
        </Link>
      </p>
    </div>
  );
}
