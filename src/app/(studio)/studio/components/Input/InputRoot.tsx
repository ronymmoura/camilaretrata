import { cn } from "@/lib/util";
import * as React from "react";

type InputRootProps = React.HTMLAttributes<HTMLDivElement>;

export function InputRoot({ children, className, ...props }: InputRootProps) {
  return (
    <div className={cn("flex flex-col space-y-1", className)} {...props}>
      {children}
    </div>
  );
}
