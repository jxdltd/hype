import { and, db, eq } from "@repo/database";
import { project, prospect } from "@repo/database/schema";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { authenticatedMiddleware } from "~/auth";
import { Notes } from "./-components/notes";

const fetchParamsSchema = z.string(); // prospectId

const fetchProspect = createServerFn()
  .middleware([authenticatedMiddleware])
  .validator(fetchParamsSchema)
  .handler(async ({ context, data }) => {
    const found = await db.query.prospect.findFirst({
      with: {
        project: true,
      },
      where: eq(prospect.id, data),
    });

    if (!found) {
      throw notFound();
    }

    if (found.project.userId !== context.user.id) {
      throw notFound();
    }

    return found;
  });

export const Route = createFileRoute(
  "/_main/projects/$id/prospects/$prospectId"
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      prospect: await fetchProspect({ data: params.prospectId }),
    };
  },
});

function RouteComponent() {
  const { prospect } = Route.useLoaderData();

  return (
    <div className="px-10 flex flex-col">
      <div className="flex items-center gap-4 justify-between mb-4">
        <h1 className="text-2xl font-bold">{prospect.email}</h1>
        {/* <div>Actions</div> */}
      </div>
      <div>
        <Notes />
      </div>
    </div>
  );
}
