import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldError({ field }: { field: AnyFieldApi }) {
  if (field.state.meta.isValid) {
    return null;
  }

  return (
    <p className="text-red-500 text-xs font-medium">
      {field.state.meta.errors.map((error) => (
        <span key={error as unknown as string}>{error?.message}</span>
      ))}
    </p>
  );
}
