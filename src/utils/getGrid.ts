type Timebar = {
  useAsGrid?: boolean;
  cells: {
    id: string;
    start: Date;
    end: Date;
  }[];
}[];

export default function getGrid(timebar: Timebar) {
  return (timebar.find(row => !!row.useAsGrid) || {}).cells;
}
