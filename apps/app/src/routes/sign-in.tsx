import { auth } from "@repo/auth/client";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import logo from "~/assets/logo.png?url";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    auth.signUp.email({ email, name: email, password });
    router.navigate({ to: "/" });
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-neutral-50">
      <img src={logo} alt="Hype" className="h-5" />
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp} type="button">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </div>
  );
}
