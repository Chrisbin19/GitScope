import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={`mx-auto w-full max-w-content px-gutter ${className ?? ""}`}
      {...props}
    >
      {children}
    </Component>
  );
}
