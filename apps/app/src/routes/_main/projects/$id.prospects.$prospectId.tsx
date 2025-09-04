import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_main/projects/$id/prospects/$prospectId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_main/projects/$id/prospects/$prospectId"!</div>;
}
