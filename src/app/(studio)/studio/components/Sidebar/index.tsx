import * as React from "react";
import { cn } from "@/lib/util";
import * as Icons from "react-icons/fa6";
import { Button } from "../Button";
import Link from "next/link";
import { Category } from "@prisma/client";

const CustomFaIcon = ({ name }: { name: string }) => {
  // @ts-expect-error nem sei
  const FaIcon = Icons[name];
  if (!FaIcon) return <p>Icon not found!</p>;

  return <FaIcon />;
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[];
}

export function Sidebar({ className, categories }: SidebarProps) {
  return (
    <div className={cn("space-y-8 p-8", className)}>
      <h4 className="mb-2 px-4 text-2xl font-semibold tracking-tight">Content Studio</h4>

      <div className="space-y-1">
        {categories.map((category) => (
          <Link key={category.id} href={`/studio/${category.slug}`}>
            <Button.Root variant="ghost" className="h-9 w-full justify-start text-lg">
              <Button.Icon>
                <CustomFaIcon name={category.icon} />
              </Button.Icon>

              <Button.Content>{category.name}</Button.Content>
            </Button.Root>
          </Link>
        ))}
      </div>
    </div>
  );
}
