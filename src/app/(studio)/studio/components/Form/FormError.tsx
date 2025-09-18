import { useFormContext } from "react-hook-form";

export function FormError() {
  const formContext = useFormContext();

  if (!formContext.formState.errors.root) return null;

  return (
    <div className="rounded bg-red-500 px-2 py-1 text-white">
      <b>Erro:</b> {formContext.formState.errors.root?.message}
    </div>
  );
}
