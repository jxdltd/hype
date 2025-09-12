<script setup lang="ts">
import { provide, ref } from 'vue';

const props = defineProps<{
  apiKey: string;
}>();

const email = ref('');
const submitted = ref(false);

function handleSubmit() {
  fetch('https://app.buildhype.dev/api/waitlist', {
    method: 'POST',
    body: JSON.stringify({ email: email.value }),
    headers: {
      'x-api-key': props.apiKey,
    },
  });

  submitted.value = true;
  email.value = '';
}

provide('waitlist', {
  email,
  submitted,
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>