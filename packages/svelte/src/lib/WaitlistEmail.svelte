<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	type WaitlistEmailProps = {
		class?: string;
		placeholder?: string;
	};

	let { class: className, placeholder }: WaitlistEmailProps = $props();

	const context = getContext<{
		email: Writable<string>;
		submitted: Writable<boolean>;
	}>('waitlist');

	if (!context) {
		throw new Error(
			'Missing context. Did you forget to wrap your component in a <Waitlist>?'
		);
	}

	const { email, submitted } = context;
</script>

{#if !$submitted}
	<input
		class={className}
		type="email"
		bind:value={$email}
		{placeholder}
		required
	/>
{/if}
