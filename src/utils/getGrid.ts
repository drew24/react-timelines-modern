import { Cell, TimebarEntry } from "../types";

export default function getGrid(timebar: TimebarEntry[]): Cell[] {
  const gridRow = timebar.find((row) => !!row.useAsGrid);
  const gridCells = gridRow?.cells || [];
  return gridCells;
}
