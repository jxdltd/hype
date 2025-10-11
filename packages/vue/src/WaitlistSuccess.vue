<script setup lang="ts">
import { inject, type Ref } from 'vue';

const { submitted } = inject<{ submitted: Ref<boolean> }>('waitlist')!;
</script>

<template>
  <p v-if="submitted">
    <slot />
  </p>
</template>