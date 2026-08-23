export interface PressItemProps {
  /** Excerpt, without quote marks */
  quote: string;
  /** e.g. "BOMB Magazine" */
  publication: string;
  author?: string;
  year?: string | number;
}
