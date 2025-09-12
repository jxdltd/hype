<script setup lang="ts">
import { inject, type Ref } from 'vue';

defineProps<{
  placeholder?: string;
}>();

const { email, submitted } = inject<{ email: Ref<string>, submitted: Ref<boolean> }>('waitlist')!;
</script>

<template>
  <input
    v-if="!submitted"
    type="email"
    v-model="email"
    :placeholder="placeholder"
  />
</template>