<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	type WaitlistProps = {
		apiKey: string;
		class?: string;
		children?: import('svelte').Snippet;
	};

	let { apiKey, class: className, children }: WaitlistProps = $props();

	const email = writable('');
	const submitted = writable(false);

	// Create context for child components
	setContext('waitlist', {
		email,
		submitted,
		handleSubmit
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		try {
			await fetch('https://app.buildhype.dev/api/waitlist', {
				method: 'POST',
				body: JSON.stringify({ email: $email }),
				headers: {
					'x-api-key': apiKey,
					'Content-Type': 'application/json'
				}
			});

			submitted.set(true);
			email.set('');
		} catch (error) {
			console.error('Failed to submit to waitlist:', error);
		}
	}
</script>

<form onsubmit={handleSubmit} class={className}>
	{@render children?.()}
</form>
