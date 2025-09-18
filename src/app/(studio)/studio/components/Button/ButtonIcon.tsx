import { cn } from "@/lib/util";

type ButtonIconProps = React.HTMLAttributes<HTMLDivElement>;

export function ButtonIcon({ className, children, ...props }: ButtonIconProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
