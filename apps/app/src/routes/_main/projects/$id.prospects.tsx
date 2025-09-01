import { and, db, eq } from "@repo/database";
import { project } from "@repo/database/schema";
import { IconCircleCheckFilled } from "@tabler/icons-react";
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
    <div className="px-10 flex flex-col">
      <div className="grid grid-cols-4 gap-4 p-3 -mx-3">
        <div className="text-sm font-medium text-neutral-500">Email</div>
        <div className="text-sm font-medium text-neutral-500">Created At</div>
        <div className="text-sm font-medium text-neutral-500">
          Last Messaged
        </div>
        <div className="text-sm font-medium text-neutral-500">Verified</div>
      </div>
      {project.prospects.map((prospect) => (
        <div
          className="grid grid-cols-4 gap-4 p-3 -mx-3 rounded-lg"
          key={prospect.id}
        >
          <div className="text-sm">{prospect.email}</div>
          <div className="text-sm" key={prospect.id}>
            5 minutes ago
          </div>
          <div className="text-sm" key={prospect.id}>
            Never
          </div>
          <div className="text-sm" key={prospect.id}>
            <IconCircleCheckFilled className="size-5 text-green-600" />
          </div>
        </div>
      ))}
    </div>
  );
}
