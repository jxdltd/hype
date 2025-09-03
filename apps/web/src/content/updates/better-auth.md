---
title: Better Auth Plugin
description: Control access to your app with our Better Auth plugin.
date: 2025-09-03
---

You can now control access to your app with our simple Better Auth plugin. Simply grant access to a prospect or batch in the dashboard allowing them to sign up while all other users are prevented from doing so.

```ts
import { hypePlugin } from "@buildhype/better-auth";

export const auth = betterAuth({
  plugins: [hypePlugin({ apiKey: "your-secret-api-key" })],
});
```

## Documentation

See our complete documentation [here](https://docs.buildhype.dev/docs/onboarding/better-auth).