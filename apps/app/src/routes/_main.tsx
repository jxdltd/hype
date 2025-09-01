import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <header className="flex items-center justify-between px-10 py-5 border-b border-neutral-300">
        <h1 className="font-mono">Hype</h1>
        <nav>Nav</nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
