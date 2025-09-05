import {
  Waitlist as HypeWaitlist,
  WaitlistEmail,
  WaitlistSubmit,
  WaitlistSuccess,
} from "@buildhype/react";

export function HypeWaitlistComponent() {
  return (
    <HypeWaitlist apiKey={process.env.NEXT_PUBLIC_HYPE_KEY!}>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <WaitlistEmail className="flex-1 px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors" />
        <WaitlistSubmit className="bg-white text-black hover:bg-gray-200 px-6 py-3 font-medium transition-colors">
          Join Waitlist
        </WaitlistSubmit>
      </div>
      <WaitlistSuccess className="text-green-400 mt-4 text-center">
        Thank you for joining the waitlist!
      </WaitlistSuccess>
    </HypeWaitlist>
  );
}
