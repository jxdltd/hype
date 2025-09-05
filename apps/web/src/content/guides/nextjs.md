---
title: Next.js
description: Learn how to use Hype with Next.js
date: 2025-09-05
---

In this guide we'll show you how to add a waitlist to your Next.js application.

Find the complete code on [GitHub](https://github.com/jxdltd/hype/tree/main/examples/nextjs).

## Create a Next.js application

If you already have a Next.js application, you can skip this step.

```bash
npm create next-app@latest my-hype-app -- --yes
```

## Install the Hype React SDK

```bash
npm install @buildhype/react
```

## Get your public API key

Go to your Hype project > Settings > Public API Key.

Generate a new API key and add it to your `.env` file.

```bash
NEXT_PUBLIC_HYPE_KEY=your-api-key
```

It's important to use the `NEXT_PUBLIC_` prefix as we want to access it from the client.

## Add the waitlist to your application

```tsx
// app/page.tsx
import {
  Waitlist,
  WaitlistEmail,
  WaitlistSubmit,
  WaitlistSuccess,
} from "@buildhype/react";

export default function Home() {
  return (
    <Waitlist apiKey={process.env.NEXT_PUBLIC_HYPE_KEY!}>
      <WaitlistEmail />
      <WaitlistSubmit>Join Waitlist</WaitlistSubmit>
      <WaitlistSuccess>Thank you for joining the waitlist!</WaitlistSuccess>
    </Waitlist>
  );
}
```

## Styling your waitlist

All Hype components are headless, allowing you to fully control the UI.

Here is an example using Tailwind.

```tsx
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
```

## Run your application

```bash
npm run dev
```

You should now see your waitlist on the home page. Submitting an email will populate your prospects list.
