export interface PullQuoteProps {
  /** The quotation, without quote marks */
  quote: string;
  /** Speaker, e.g. "Zadik Zadikian" */
  attribution?: string;
  /** Publication or context, e.g. "BOMB Magazine, 2025" */
  source?: string;
}
