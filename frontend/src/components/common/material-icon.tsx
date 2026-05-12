import type { CSSProperties } from "react";

type MaterialIconProps = {
  name: string;
  className?: string;
  filled?: boolean;
};

export function MaterialIcon({ name, className, filled = false }: MaterialIconProps) {
  const style: CSSProperties | undefined = filled
    ? {
        fontVariationSettings: '"FILL" 1, "wght" 500, "GRAD" 0, "opsz" 24',
      }
    : undefined;

  return (
    <span className={`material-symbols-outlined ${className ?? ""}`.trim()} style={style}>
      {name}
    </span>
  );
}
