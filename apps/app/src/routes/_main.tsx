import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <header className="flex items-center justify-between px-10 py-5">
        <h1 className="font-mono">Hype</h1>
        <nav className="flex items-center gap-4 text-sm text-neutral-500">
          <a href="#">Docs</a>
          <a href="#">Support</a>
        </nav>
      </header>
      <main className="bg-white flex-1 rounded-t-3xl border-t border-neutral-200">
        <Outlet />
      </main>
    </div>
  );
}
