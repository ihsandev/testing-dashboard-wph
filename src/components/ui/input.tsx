import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";

const inputVariants = cva(
  "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-wph-danger-400 dark:aria-invalid:ring-wph-danger-400 aria-invalid:border-wph-danger-400",
  {
    variants: {
      variant: {
        default:
          "text-base bg-wph-neutral-900 text-wph-neutral-25 border-wph-neutral-900 placeholder:text-wph-neutral-500 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <input
        type={type === "password" && showPassword ? "text" : type}
        data-slot="input"
        className={cn(inputVariants({ variant, className }))}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Eye className="w-4 text-wph-neutral-500" />
          ) : (
            <EyeOff className="w-4 text-wph-neutral-500" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
