import { cn } from "@/lib/util";
import * as React from "react";
import { useFormContext } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, name, ...props }, ref) => {
    const formContext = useFormContext();

    if (!name) return null;

    return (
      <>
        <input
          className={cn(
            "flex h-9 w-full border border-zinc-700 bg-transparent px-3 py-1 transition-colors",
            "placeholder:text-muted-foreground focus-visible:ring-ring",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "focus-visible:outline-none focus-visible:ring-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
          {...formContext.register(name)}
          ref={ref}
        />

        <div className="text-red-400">
          {formContext.formState?.errors?.[name]?.message?.toString()}
        </div>
      </>
    );
  },
);

InputText.displayName = "Input";

export { InputText };
