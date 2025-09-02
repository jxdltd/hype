import React from "react";

type WaitlistContext = {
  submitted: boolean;
  email: string;
  setEmail: (email: string) => void;
};

const waitlistContext = React.createContext<WaitlistContext | null>(null);

function useWaitlistContext() {
  const context = React.useContext(waitlistContext);
  if (!context) {
    throw new Error(
      "Missing context. Did you forget to wrap your component in a <Waitlist>?"
    );
  }
  return context;
}

type WaitlistProps = {
  children: React.ReactNode;
  apiKey: string;
  className?: string;
};

export function Waitlist({ children, className, apiKey }: WaitlistProps) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("https://app.buildhype.dev/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "x-api-key": apiKey,
      },
    });

    setSubmitted(true);
    setEmail("");
  }

  return (
    <waitlistContext.Provider value={{ submitted, email, setEmail }}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </waitlistContext.Provider>
  );
}

type WaitlistEmailProps = {
  className?: string;
  placeholder?: string;
};

export function WaitlistEmail({ className, placeholder }: WaitlistEmailProps) {
  const { submitted, email, setEmail } = useWaitlistContext();

  if (submitted) {
    return null;
  }

  return (
    <input
      className={className}
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={placeholder}
    />
  );
}

type WaitlistSubmitProps = {
  children: React.ReactNode;
  className?: string;
};

export function WaitlistSubmit({ children, className }: WaitlistSubmitProps) {
  const { submitted } = useWaitlistContext();

  if (submitted) {
    return null;
  }

  return (
    <button className={className} type="submit">
      {children}
    </button>
  );
}

type WaitlistSuccessProps = {
  children: React.ReactNode;
  className?: string;
};

export function WaitlistSuccess({ children, className }: WaitlistSuccessProps) {
  const { submitted } = useWaitlistContext();

  if (!submitted) {
    return null;
  }

  return <p className={className}>{children}</p>;
}
