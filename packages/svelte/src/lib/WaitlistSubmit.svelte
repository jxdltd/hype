<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	type WaitlistSubmitProps = {
		class?: string;
		children?: import('svelte').Snippet;
	};

	let { class: className, children }: WaitlistSubmitProps = $props();

	const context = getContext<{
		submitted: Writable<boolean>;
	}>('waitlist');

	if (!context) {
		throw new Error(
			'Missing context. Did you forget to wrap your component in a <Waitlist>?'
		);
	}

	const { submitted } = context;
</script>

{#if !$submitted}
	<button class={className} type="submit">
		{@render children?.()}
	</button>
{/if}
