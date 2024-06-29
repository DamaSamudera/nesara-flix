import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["flex", "bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100 hover:text-black"],
      textIcon: ["flex", "bg-secondary", "hover:bg-secondary-hover", "gap-1", "fit-content"]
    },
    size: {
      default: ["rounded", "p-2", "text-black"],
      icon: [
        "text-white",
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
};

export default Button;
