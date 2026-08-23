/** @startingPoint section="Editorial" subtitle="Year-indexed CV rows: exhibitions, collections, press" viewport="700x360" */
export interface CVListProps {
  /** Uppercase group heading, e.g. "Selected exhibitions" */
  heading?: string;
  entries: { year: string | number; text: string }[];
}
