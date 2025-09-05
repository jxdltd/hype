import {
  Waitlist,
  WaitlistEmail,
  WaitlistSubmit,
  WaitlistSuccess,
} from "@buildhype/react";

export function App() {
  return (
    <Waitlist apiKey="your-api-key">
      <WaitlistEmail />
      <WaitlistSubmit />
      <WaitlistSuccess />
    </Waitlist>
  );
}
