import { cn } from "@/lib/util";
import * as React from "react";

type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function InputLabel({ className, children, htmlFor, ...props }: InputLabelProps) {
  return (
    <label className={cn("", className)} {...props}>
      {children}
    </label>
  );
}
