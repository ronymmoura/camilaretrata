import { cn } from "@/lib/util";
import * as React from "react";

type FormRootProps = React.FormHTMLAttributes<HTMLFormElement>;

export function FormRoot({ children, className, ...props }: FormRootProps) {
  return (
    <form className={cn("flex flex-col space-y-5", className)} {...props}>
      {children}
    </form>
  );
}
