import { ComponentPropsWithoutRef, FunctionComponent } from "react";

import Row from './Row'

interface Row extends ComponentPropsWithoutRef<typeof Row> {
  id: string;
}
interface Props {
  time: ComponentPropsWithoutRef<typeof Row>['time'];
  rows: Row[];
}

const Timebar: FunctionComponent<Props> = (props) => {
  const { time, rows } = props;
  return (
    <div className="rt-timebar">
      {rows.map((row) => {
        const { id, cells, style } = row;
        return (
          <Row key={id} time={time} cells={cells} style={style} />
        );
      })}
    </div>
  );
};

export default Timebar;
