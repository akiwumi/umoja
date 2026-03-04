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
  'inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F9A825]';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-[#F9A825] text-[#051F05] hover:bg-[#F57F17] active:bg-[#E65100] shadow-md hover:shadow-lg',
  outline:
    'border-2 border-[#FFCA28] text-[#FFCA28] bg-transparent hover:bg-[#FFCA28] hover:text-[#051F05] active:bg-[#F9A825]',
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
