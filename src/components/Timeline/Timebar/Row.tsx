import React, { ComponentPropsWithoutRef } from 'react'

import Cell from './Cell'
import { FunctionComponent } from "enzyme";

interface Cell extends ComponentPropsWithoutRef<typeof Cell> {
  id: string;
}
interface Props {
  time: ComponentPropsWithoutRef<typeof Cell>['time'];
  cells: Cell[];
  style: React.CSSProperties;
}

const Row: FunctionComponent<Props> = (props) => {
  const { time, cells, style } = props;
  return (
    <div className="rt-timebar__row" style={style}>
      {cells.map(cell => {
        const { end, id, start, title } = cell;
        const selectedTime = cell.time || time;
        return (
          <Cell key={id}
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

export default Row
