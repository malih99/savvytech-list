import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

export default function IconButton({ className, label, ...rest }: Props) {
  return (
    <button
      {...rest}
      aria-label={label}
      className={clsx(
        "p-2 rounded-md inline-flex items-center justify-center focus:outline-none focus:ring-2",
        className
      )}
    />
  );
}
