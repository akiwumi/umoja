/**
 * Utility helpers shared across the project.
 */

/**
 * Merges Tailwind class names, filtering out falsy values.
 * A lightweight alternative to `clsx` + `tailwind-merge`.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
