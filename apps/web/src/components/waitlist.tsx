import {
  Waitlist as HypeWaitlist,
  WaitlistEmail,
  WaitlistSubmit,
  WaitlistSuccess,
} from "@buildhype/react";

export function Waitlist() {
  return (
    <HypeWaitlist
      className="flex gap-2 items-stretch"
      apiKey={import.meta.env.PUBLIC_HYPE_KEY}
    >
      <WaitlistEmail
        placeholder="Enter your email"
        className="border border-neutral-700 p-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 text-sm"
      />
      <WaitlistSubmit className="bg-white text-black px-4 py-2 hover:bg-neutral-100 cursor-pointer text-sm">
        Join Waitlist
      </WaitlistSubmit>
      <WaitlistSuccess className="text-sm font-medium">
        Thank you for joining the waitlist!
      </WaitlistSuccess>
    </HypeWaitlist>
  );
}
