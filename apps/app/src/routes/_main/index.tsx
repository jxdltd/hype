import { db, eq } from "@repo/database";
import { project } from "@repo/database/schema";
import {
  IconBrowser,
  IconMessageCircleFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createProject } from "~/projects";
import { getAuth } from "../../auth";

const fetchProjects = createServerFn().handler(async () => {
  const auth = await getAuth();

  if (!auth) {
    throw new Error("No auth found");
  }

  const projects = await db.query.project.findMany({
    where: eq(project.userId, auth.user.id),
    with: {
      prospects: true,
    },
  });

  return projects;
});

export const Route = createFileRoute("/_main/")({
  component: RouteComponent,
  loader: async () => {
    const auth = await getAuth();

    if (!auth) {
      throw redirect({ to: "/sign-up" });
    }

    const projects = await fetchProjects();

    if (projects.length === 0) {
      const created = await createProject({
        data: { name: "My first project" },
      });

      throw redirect({ to: "/projects/$id", params: { id: created.id } });
    }

    return {
      auth,
      projects,
    };
  },
});

function RouteComponent() {
  const { projects } = Route.useLoaderData();

  return (
    <div className="grid grid-cols-3 gap-4 p-10">
      {projects.map((project) => (
        <Link
          to="/projects/$id"
          params={{ id: project.id }}
          className="bg-white rounded-lg p-4 border border-neutral-200 shadow-xs flex gap-3 hover:bg-neutral-50"
          key={project.id}
        >
          <div className="size-10 rounded bg-neutral-100 flex items-center justify-center text-neutral-500">
            <IconBrowser className="size-5" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{project.name}</p>
            <div className="flex items-center gap-3">
              <p className="text-xs text-neutral-500 flex items-center gap-0.5 font-bold">
                <IconUserFilled className="size-4" />
                {project.prospects.length}
              </p>
              <p className="text-xs text-neutral-500 flex items-center gap-0.5 font-bold">
                <IconMessageCircleFilled className="size-4" />0
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
