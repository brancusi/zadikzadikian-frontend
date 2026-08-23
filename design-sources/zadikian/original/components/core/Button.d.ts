export interface ButtonProps {
  children: React.ReactNode;
  /** solid = ink fill; outline = 1px hairline (default); text = underlined word */
  variant?: 'solid' | 'outline' | 'text';
  onClick?: () => void;
  disabled?: boolean;
  /** Renders as <a> */
  href?: string;
}
