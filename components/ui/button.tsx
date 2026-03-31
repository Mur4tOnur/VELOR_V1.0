import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        variant === "default" &&
          "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
        variant === "outline" &&
          "border border-border bg-background shadow-sm shadow-black/5 hover:bg-muted/30 hover:text-foreground",
        variant === "ghost" && "hover:bg-muted/30 hover:text-foreground",
        size === "default" && "h-9 px-4 py-2",
        size === "sm" && "h-8 rounded-lg px-3 text-xs",
        size === "lg" && "h-10 rounded-lg px-8",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button };
