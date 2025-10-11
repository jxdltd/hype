# @buildhype/vue

Vue components for adding a waitlist form to your project, powered by Hype.

## Installation

```bash
bun add @buildhype/vue
```

## Usage

Wrap the `WaitlistEmail`, `WaitlistSubmit`, and `WaitlistSuccess` components within the main `Waitlist` component. The `Waitlist` component manages the form state and submission.

```vue
<script setup>
import { 
  Waitlist, 
  WaitlistEmail, 
  WaitlistSubmit, 
  WaitlistSuccess 
} from '@buildhype/vue';
</script>

<template>
  <Waitlist 
    api-key="YOUR_API_KEY"
    class="flex flex-col gap-2"
  >
    <WaitlistEmail placeholder="Enter your email" />
    <WaitlistSubmit>Join Waitlist</WaitlistSubmit>
    <WaitlistSuccess>Thank you for joining!</WaitlistSuccess>
  </Waitlist>
</template>
```
