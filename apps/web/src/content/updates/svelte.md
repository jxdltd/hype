---
title: Svelte SDK
description: Add a waitlist to your Svelte application with a few lines of code.
date: 2025-09-05
---

We're pleased to announce the release of our Svelte SDK. Allowing you to easily add a waitlist to your Svelte application with a few lines of code. Our components are designed to be headless, allowing you to fully control the UI.

_You'll need a public API key to get started. Join the waitlist to get one._

## Install `@buildhype/svelte`

```bash
npm install @buildhype/svelte
```

## Example

Here's an example from the [Hype](https://www.buildhype.dev/) website using Tailwind.

```svelte
<script>
  import {
    Waitlist,
    WaitlistEmail,
    WaitlistSubmit,
    WaitlistSuccess,
  } from "@buildhype/svelte";
  import { PUBLIC_HYPE_KEY } from "$env/static/public";
</script>

<Waitlist
  class="flex gap-2 items-stretch"
  apiKey={PUBLIC_HYPE_KEY}
>
  <WaitlistEmail class="border border-neutral-700 p-2 focus:outline-none focus:ring-2 focus:ring-neutral-500 text-sm" />
  <WaitlistSubmit class="bg-white text-black px-4 py-2 hover:bg-neutral-100 cursor-pointer text-sm">
    Join Waitlist
  </WaitlistSubmit>
  <WaitlistSuccess class="text-sm font-medium">
    Thank you for joining the waitlist!
  </WaitlistSuccess>
</Waitlist>
```

## Documentation

See our complete Svelte documentation [here](https://docs.buildhype.dev/docs/waitlist/svelte).