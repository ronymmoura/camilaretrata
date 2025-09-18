import { cn } from "@/lib/util";

type ButtonContentProps = React.HTMLAttributes<HTMLDivElement>;

export function ButtonContent({ className, children, ...props }: ButtonContentProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
