import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { formOpts } from "~/forms/projects/new/options";
import { createProject } from "~/projects";

export const Route = createFileRoute("/projects/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm({
		...formOpts,
		onSubmit: ({ value }) => {
			createProject({ data: value });
		},
	});

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-neutral-50">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
				className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-neutral-200 w-full max-w-md"
			>
				<form.Field name="name">
					{(field) => {
						return (
							<div>
								<input
									name={field.name}
									type="text"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									className="w-full p-2 rounded-md border border-neutral-200"
								/>
								{field.state.meta.errors.map((error) => (
									<p
										className="text-red-500 text-sm font-medium"
										key={error as unknown as string}
									>
										{error?.message}
									</p>
								))}
							</div>
						);
					}}
				</form.Field>
				<form.Subscribe
					selector={(formState) => [
						formState.canSubmit,
						formState.isSubmitting,
					]}
				>
					{([canSubmit, isSubmitting]) => (
						<button
							type="submit"
							disabled={!canSubmit}
							className="w-full p-2 rounded-md border border-neutral-200"
						>
							{isSubmitting ? "..." : "Submit"}
						</button>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}
