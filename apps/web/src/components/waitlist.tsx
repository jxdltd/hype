import { useState } from "react";

export function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);

    fetch("https://app.buildhype.dev/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "x-api-key": import.meta.env.PUBLIC_HYPE_KEY,
      },
    });
  }

  if (submitted) {
    return (
      <p className="text-sm font-medium">Thank you for joining the waitlist!</p>
    );
  }

  return (
    <form className="flex gap-2 items-stretch" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="border border-neutral-700 p-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 text-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="bg-white text-black px-4 py-2 hover:bg-neutral-100 cursor-pointer text-sm"
      >
        Join
      </button>
    </form>
  );
}
