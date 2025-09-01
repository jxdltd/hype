import { db, eq } from "@repo/database";
import { project } from "@repo/database/schema";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getAuth } from "~/auth";

const fetchProject = createServerFn()
  .validator((data: unknown) => {
    if (typeof data !== "string") {
      throw new Error("Invalid data");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const auth = await getAuth();

    if (!auth) {
      throw redirect({ to: "/sign-up" });
    }

    return db.query.project.findFirst({
      where: eq(project.id, data),
    });
  });

export const Route = createFileRoute("/_main/projects/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const auth = await getAuth();

    if (!auth) {
      throw redirect({ to: "/sign-up" });
    }

    const project = await fetchProject({ data: params.id });

    if (!project) {
      throw notFound();
    }

    return { project };
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { project } = Route.useLoaderData();

  return (
    <div>
      <div className="flex items-center justify-between px-10 py-5">
        <Link to="/projects/$id" params={{ id }} className="font-medium">
          {project.name}
        </Link>
        <div className="text-sm text-neutral-500 flex items-center gap-4">
          <Link
            to="/projects/$id/prospects"
            params={{ id }}
            activeProps={{ className: "font-medium text-black" }}
          >
            Prospects
          </Link>
          <Link
            to="/projects/$id/settings"
            params={{ id }}
            activeProps={{ className: "font-medium text-black" }}
          >
            Settings
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
