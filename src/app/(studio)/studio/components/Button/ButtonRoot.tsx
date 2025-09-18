import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/util";

const buttonVariants = cva(
  `inline-flex items-center justify-center text-sm font-medium space-x-3 rounded px-3 py-1
  transition-colors hover:bg-zinc-700 
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: "text-white bg-cyan-600 hover:bg-cyan-700",
        secondary: "bg-zinc-700 text-white",
        success: "text-white bg-emerald-500 hover:bg-emerald-600",
        danger: "text-white bg-red-500 hover:bg-red-600",
        outline: "border",
        ghost: "",
      },
      size: {
        default: "h-8",
        sm: "h-7",
        lg: "h-9",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, type = "button", children, size, ...props }: ButtonProps, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

ButtonRoot.displayName = "Button";

export { ButtonRoot, buttonVariants };
