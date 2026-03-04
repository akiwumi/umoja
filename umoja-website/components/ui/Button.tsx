'use client';

/**
 * Button
 *
 * Two visual variants:
 *   - 'primary'  → gold background, dark text, darkens on hover
 *   - 'outline'  → transparent with a gold border, fills on hover
 *
 * Renders a <button> by default, or an <a> tag when an `href` is supplied.
 * All interactive areas meet the 44 × 44 px minimum touch target.
 */
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline';

interface ButtonBaseProps {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  type?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const BASE =
  'inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E8BC20]';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-[#E8BC20] text-[#1A1D16] hover:bg-[#C99A0A] active:bg-[#A37A04] shadow-md hover:shadow-lg',
  outline:
    'border-2 border-[#E8BC20] text-[#E8BC20] bg-transparent hover:bg-[#E8BC20] hover:text-[#1A1D16] active:bg-[#C99A0A]',
};

export default function Button(props: ButtonProps) {
  const { variant = 'primary', children, className } = props;
  const classes = cn(BASE, VARIANTS[variant], className);

  if (props.href !== undefined) {
    return (
      <a href={props.href} onClick={props.onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
