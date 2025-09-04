import { auth } from "@repo/auth/client";
import { IconLoader2 } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import logo from "~/assets/logo.png?url";
import { FieldError } from "~/components/form/field-error";
import { formOpts, formSchema } from "~/forms/auth";
import { cn } from "~/utils/cn";

export const Route = createFileRoute("/sign-in")({
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
      await auth.signIn.email(value);

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
              className={cn(
                "w-full p-2 rounded-md bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 cursor-pointer h-10 flex items-center justify-center",
                isSubmitting && "bg-neutral-800"
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <IconLoader2 className="animate-spin size-4" />
              ) : (
                "Sign In"
              )}
            </button>
          )}
        </form.Subscribe>
      </form>
      <p className="text-sm text-neutral-500">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
