import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "destructive";
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500",
    secondary:
      "!bg-white border text-slate-900 hover:bg-slate-50 focus:ring-slate-300",
    destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  } as const;
  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
