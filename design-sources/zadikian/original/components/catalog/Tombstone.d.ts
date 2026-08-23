export interface TombstoneProps {
  /** Work title, rendered italic */
  title: string;
  year?: string | number;
  /** e.g. "Pigmented plaster" */
  medium?: string;
  /** Inches first, cm in parentheses: "108 × 24 × 24 in (274 × 61 × 61 cm)" */
  dimensions?: string;
  /** e.g. "Unique" or "Edition of 3 + 1 AP" */
  edition?: string;
  /** Catalog number, e.g. "A-009" */
  catalogNo?: string;
  align?: 'left' | 'center' | 'right';
}
