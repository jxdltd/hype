import { auth } from "@repo/auth/client";
import {
  createFileRoute,
  Link,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import logo from "../assets/logo.png";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <header className="flex items-center justify-between px-10 py-5">
        <Link to="/">
          <img src={logo} alt="Hype" className="h-5" />
        </Link>
        <nav className="flex items-center gap-4 text-sm text-neutral-500">
          <a
            href="https://docs.buildhype.dev/docs"
            target="_blank"
            rel="noopener"
          >
            Docs
          </a>
          <a href="#">Support</a>
          <button
            type="button"
            onClick={() => {
              auth.signOut().then(() => {
                router.navigate({ to: "/sign-in" });
              });
            }}
          >
            Sign Out
          </button>
        </nav>
      </header>
      <main className="bg-white flex-1 rounded-t-3xl border-t border-neutral-200">
        <Outlet />
      </main>
    </div>
  );
}
