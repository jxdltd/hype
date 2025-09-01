import { createFileRoute } from "@tanstack/react-router";
import { createPublicKey } from "~/keys";

export const Route = createFileRoute("/_main/projects/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return <div>Stats</div>;
}
