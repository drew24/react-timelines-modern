import { CSSProperties } from "react";

import Cell from "./Cell";
import { FunctionComponent } from "enzyme";
import { Cell as CellInterface, TimeSettings } from "../../../types";

interface Props {
  time: TimeSettings;
  cells: CellInterface[];
  style: CSSProperties;
}

const Row: FunctionComponent<Props> = (props) => {
  const { time, cells, style } = props;
  return (
    <div className="rt-timebar__row" style={style}>
      {cells.map((cell) => {
        const { end, id, start, title } = cell;
        const selectedTime = cell.time || time;
        return (
          <Cell
            key={id}
            end={end}
            start={start}
            time={selectedTime}
            title={title}
          />
        );
      })}
    </div>
  );
};

export default Row;
