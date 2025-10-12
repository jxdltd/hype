import {
	Waitlist as HypeWaitlist,
	WaitlistEmail,
	WaitlistSubmit,
	WaitlistSuccess,
} from "@buildhype/react";

export function Waitlist() {
	return (
		<HypeWaitlist
			className="bg-white rounded-lg p-2 flex gap-2 items-stretch focus-within:ring-2 border border-neutral-200 ring-gray-100"
			apiKey={import.meta.env.PUBLIC_HYPE_KEY}
		>
			<WaitlistEmail
				placeholder="jamie@example.com"
				className="focus:outline-none px-2"
			/>
			<WaitlistSubmit className="text-sm text-white bg-purple-600 size-10 rounded-md hover:bg-purple-700 font-mono cursor-pointer transition-colors flex items-center justify-center gap-2 [&_svg]:size-4">
				{/* <span>Get Started</span> */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right-dashed"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M5 12h.5m3 0h1.5m3 0h6"></path>
					<path d="M15 16l4 -4"></path>
					<path d="M15 8l4 4"></path>
				</svg>
			</WaitlistSubmit>
			<WaitlistSuccess className="text-sm font-medium text-center text-gray-700 font-medium">
				Thank you for signing up! We'll be in touch very soon.
			</WaitlistSuccess>
		</HypeWaitlist>
	);
}
