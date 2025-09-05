<script lang="ts">
	import { Waitlist, WaitlistEmail, WaitlistSubmit, WaitlistSuccess } from '$lib';
</script>

<h1>Waitlist Demo</h1>
<p>This is a demo of the Svelte waitlist components.</p>

<div style="max-width: 400px; margin: 2rem auto; padding: 2rem; border: 1px solid #ccc; border-radius: 8px;">
	<Waitlist apiKey="demo-key" class="waitlist-form">
		<h2>Join Our Waitlist</h2>
		
		<WaitlistEmail 
			class="email-input" 
			placeholder="Enter your email address" 
		/>
		
		<WaitlistSubmit class="submit-button">
			Join Waitlist
		</WaitlistSubmit>
		
		<WaitlistSuccess class="success-message">
			🎉 Thanks for joining! We'll be in touch soon.
		</WaitlistSuccess>
	</Waitlist>
</div>

<style>
	:global(.waitlist-form) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	:global(.email-input) {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}
	
	:global(.submit-button) {
		padding: 0.75rem 1.5rem;
		background: #007acc;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
	}
	
	:global(.submit-button:hover) {
		background: #005a9e;
	}
	
	:global(.success-message) {
		color: #28a745;
		font-weight: 500;
		text-align: center;
		margin: 0;
	}
</style>
