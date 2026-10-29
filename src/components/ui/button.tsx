import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105 motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        cta: "bg-cta text-cta-foreground hover:bg-cta-hover shadow-cta font-bold",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover shadow-whatsapp font-bold [&_svg]:size-5",
        pill: "rounded-full border border-input bg-muted text-foreground hover:border-primary hover:bg-accent",
        selected:
          "rounded-full border border-primary bg-accent text-primary hover:bg-accent font-semibold",
        accordion:
          "w-full justify-between whitespace-normal text-left text-foreground hover:bg-muted hover:scale-100 rounded-none",
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
