# @buildhype/svelte

A Svelte component library for creating waitlist forms with ease.

## Installation

```bash
npm install @buildhype/svelte
```

## Usage

```svelte
<script>
  import { Waitlist, WaitlistEmail, WaitlistSubmit, WaitlistSuccess } from '@buildhype/svelte';
</script>

<Waitlist apiKey="your-api-key" class="my-form">
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
```

## Components

### `<Waitlist>`

The main wrapper component that manages form state and submission.

**Props:**
- `apiKey: string` - Your API key for the waitlist service
- `class?: string` - Optional CSS class for styling

### `<WaitlistEmail>`

Email input component that automatically manages the email state.

**Props:**
- `class?: string` - Optional CSS class for styling
- `placeholder?: string` - Placeholder text for the input

### `<WaitlistSubmit>`

Submit button component that handles form submission.

**Props:**
- `class?: string` - Optional CSS class for styling

### `<WaitlistSuccess>`

Success message component that shows after successful submission.

**Props:**
- `class?: string` - Optional CSS class for styling

## Features

- ✅ Built with Svelte 5
- ✅ TypeScript support
- ✅ Context-based state management
- ✅ Automatic form handling
- ✅ Customizable styling
- ✅ Error handling

## API

The components automatically submit to `https://app.buildhype.dev/api/waitlist` with the provided API key.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the package
npm run build

# Type check
npm run check
```