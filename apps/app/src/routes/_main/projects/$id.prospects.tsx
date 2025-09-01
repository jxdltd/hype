import { and, db, eq } from "@repo/database";
import { project } from "@repo/database/schema";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
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
      where: and(eq(project.id, data), eq(project.userId, auth.user.id)),
      with: {
        prospects: true,
      },
    });
  });

export const Route = createFileRoute("/_main/projects/$id/prospects")({
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

    return {
      auth,
      project,
    };
  },
});

function RouteComponent() {
  const { project } = Route.useLoaderData();

  return (
    <div>
      {project.prospects.map((prospect) => (
        <div key={prospect.id}>{prospect.email}</div>
      ))}
    </div>
  );
}
