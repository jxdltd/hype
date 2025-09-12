<script setup lang="ts">
import { inject, type Ref } from 'vue';

const { submitted } = inject<{ submitted: Ref<boolean> }>('waitlist')!;
</script>

<template>
  <button v-if="!submitted" type="submit">
    <slot />
  </button>
</template>