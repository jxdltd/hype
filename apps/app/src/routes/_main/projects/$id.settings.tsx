import { createFileRoute } from "@tanstack/react-router";
import { createPublicKey } from "~/keys";

export const Route = createFileRoute("/_main/projects/$id/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          createPublicKey({
            data: {
              projectId: id,
            },
          })
        }
      >
        Create Public Key
      </button>
    </div>
  );
}
