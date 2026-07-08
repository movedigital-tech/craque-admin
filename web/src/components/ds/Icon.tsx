import * as LucideIcons from 'lucide-react';
import type { CSSProperties } from 'react';

function kebabToPascal(name: string): string {
  return name
    .split('-')
    .map((part) => (/^[0-9]+$/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: CSSProperties;
  className?: string;
  strokeWidth?: number;
  flexShrink?: number;
}

export function Icon({ name, size = 18, color, style, className, strokeWidth = 1.75, flexShrink }: IconProps) {
  const componentName = kebabToPascal(name);
  const LucideIcon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string; style?: CSSProperties; className?: string; strokeWidth?: number }>>)[
    componentName
  ];
  if (!LucideIcon) return null;
  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={{ display: 'block', flexShrink, ...style }}
    />
  );
}
