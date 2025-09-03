import { IconCircleCheckFilled } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/verified")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <IconCircleCheckFilled className="size-12 text-green-600 mb-10" />
      <h1 className="text-2xl font-bold mb-2">Email Verified</h1>
      <p className="text-sm text-neutral-500">
        Your email has been verified. You can now close this page.
      </p>
    </div>
  );
}
