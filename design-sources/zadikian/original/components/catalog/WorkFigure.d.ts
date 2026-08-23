/** @startingPoint section="Catalog" subtitle="Artwork photograph with its canonical tombstone caption" viewport="700x560" */
export interface WorkFigureProps {
  /** Image path, e.g. assets/web/A-009.jpg */
  src: string;
  alt?: string;
  title: string;
  year?: string | number;
  medium?: string;
  dimensions?: string;
  edition?: string;
  catalogNo?: string;
  /** Cover-fit the image to its container */
  bleed?: boolean;
}
