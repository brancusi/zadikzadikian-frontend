/** @startingPoint section="Typographic" subtitle="Rule, label, and large serif title opening a section" viewport="700x300" */
export interface SectionHeadingProps {
  /** Large serif title, sentence case */
  title: string;
  /** Uppercase metadata label above, e.g. "Future work" */
  label?: string;
  /** Right-aligned index, e.g. "02" */
  index?: string;
  /** Title size */
  size?: 'colossal' | 'display' | 'headline';
}
