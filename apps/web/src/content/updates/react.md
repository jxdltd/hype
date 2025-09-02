---
title: React SDK
description: Add a waitlist to your React application with a few lines of code.
date: 2025-09-02
---

We're pleased to announce the release of our React SDK. Allowing you to easily add a waitlist to your React application with a few lines of code. Our compoenents are desinged to be headless, allowing you to fully control the UI.

_You'll need a public API key to get started. Join the waitlist to get one._

## Install `@buildhype/react`

```bash
npm install @buildhype/react
```

## Example

Here's an example from the [Hype](https://www.buildhype.dev/) website using Tailwind.

```tsx
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
      <WaitlistEmail className="border border-neutral-700 p-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 text-sm" />
      <WaitlistSubmit className="bg-white text-black px-4 py-2 hover:bg-neutral-100 cursor-pointer text-sm">
        Join Waitlist
      </WaitlistSubmit>
      <WaitlistSuccess className="text-sm font-medium">
        Thank you for joining the waitlist!
      </WaitlistSuccess>
    </HypeWaitlist>
  );
}
```

## Documentation

See our complete React documentation [here](https://www.buildhype.dev/docs/waitlist/react).