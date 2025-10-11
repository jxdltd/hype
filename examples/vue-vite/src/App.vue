<script setup lang="ts">
import { 
  Waitlist, 
  WaitlistEmail, 
  WaitlistSubmit, 
  WaitlistSuccess 
} from '@buildhype/vue';
</script>

<template>
  <div class="card">
    <h1>Hype Vue Example</h1>
    <Waitlist 
      :api-key="import.meta.env.VITE_HYPE_API_KEY"
      class="waitlist-form"
    >
      <WaitlistEmail 
        placeholder="Enter your email" 
        class="waitlist-input"
      />
      <WaitlistSubmit class="waitlist-button">
        Join Waitlist
      </WaitlistSubmit>
      <WaitlistSuccess class="waitlist-success">
        Thanks for joining! Check your email.
      </WaitlistSuccess>
    </Waitlist>
  </div>
</template>

<style>
.card {
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.waitlist-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.waitlist-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  width: 100%;
}

.waitlist-button {
  background-color: #111827;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}

.waitlist-success {
  color: #059669;
  text-align: center;
}
</style>
