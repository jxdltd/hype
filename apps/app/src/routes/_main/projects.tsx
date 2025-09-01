import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { getAuth } from "~/auth";

export const Route = createFileRoute("/_main/projects")({
  component: RouteComponent,
  loader: async () => {
    const auth = await getAuth();

    if (!auth) {
      throw redirect({ to: "/sign-up" });
    }
  },
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div>
      <div className="flex items-center px-10 py-5 border-b border-neutral-300">
        <nav>
          <Link
            to="/projects/$id/prospects"
            params={{ id }}
            inactiveProps={{
              className: "text-neutral-500",
            }}
            activeProps={{
              className: "font-medium text-black",
            }}
          >
            Waitlist
          </Link>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
