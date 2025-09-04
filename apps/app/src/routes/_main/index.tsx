import { db, eq } from "@repo/database";
import { project } from "@repo/database/schema";
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
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <Link to="/projects/$id" params={{ id: project.id }}>
            {project.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
