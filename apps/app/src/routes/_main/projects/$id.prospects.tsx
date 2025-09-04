import { and, db, eq } from "@repo/database";
import { project } from "@repo/database/schema";
import {
  IconCircleCheckFilled,
  IconCircleDot,
  IconCircleX,
  IconCircleXFilled,
} from "@tabler/icons-react";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getAuth } from "~/auth";
import { env } from "~/env";

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

  if (project.prospects.length === 0) {
    return (
      <div className="text-center p-10 text-sm text-neutral-500">
        No prospects found! Read the{" "}
        <a href={env().VITE_DOCS_URL} className="text-blue-500">
          docs
        </a>{" "}
        to learn how to get started.
      </div>
    );
  }

  return (
    <div className="px-10 flex flex-col">
      <div className="grid grid-cols-6 gap-4 p-3 -mx-3">
        <div className="text-sm font-medium text-neutral-500">Email</div>
        <div className="text-sm font-medium text-neutral-500">Signed Up</div>
        <div className="text-sm font-medium text-neutral-500">
          Last Messaged
        </div>
        <div className="text-sm font-medium text-neutral-500">
          Email Verified
        </div>
        <div className="text-sm font-medium text-neutral-500">
          Access Granted
        </div>
        <div className="text-sm font-medium text-neutral-500">Stage</div>
      </div>
      {project.prospects.map((prospect) => (
        <div
          className="grid grid-cols-6 gap-4 p-3 -mx-3 rounded-lg"
          key={prospect.id}
        >
          <div className="text-sm">{prospect.email}</div>
          <div className="text-sm">5 minutes ago</div>
          <div className="text-sm">Never</div>
          <div className="text-sm">
            {prospect.emailVerified ? (
              <IconCircleCheckFilled className="size-4 text-green-500" />
            ) : (
              <IconCircleXFilled className="size-4 text-red-500" />
            )}
          </div>
          <div className="text-sm">
            {prospect.accessGranted ? (
              <IconCircleCheckFilled className="size-4 text-green-500" />
            ) : (
              <IconCircleXFilled className="size-4 text-red-500" />
            )}
          </div>
          <p className="text-xs flex items-center justify-center gap-1 bg-blue-100 text-blue-500 rounded-full font-medium py-1 px-2 w-min">
            <span>Waitlist</span>
          </p>
        </div>
      ))}
    </div>
  );
}
