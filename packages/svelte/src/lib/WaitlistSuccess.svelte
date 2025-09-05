<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	type WaitlistSuccessProps = {
		class?: string;
		children?: import('svelte').Snippet;
	};

	let { class: className, children }: WaitlistSuccessProps = $props();

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

{#if $submitted}
	<p class={className}>
		{@render children?.()}
	</p>
{/if}
