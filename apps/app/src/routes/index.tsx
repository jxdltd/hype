import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuth } from "../auth";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    const auth = await getAuth();

    if (!auth) {
      throw redirect({ to: "/sign-up" });
    }

    return {
      auth,
    };
  },
});

function RouteComponent() {
  const { auth } = Route.useLoaderData();

  return <div>Hello {auth.user.email}!</div>;
}
