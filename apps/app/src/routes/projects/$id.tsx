import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <button type="button">Create Public Key</button>
    </div>
  );
}
