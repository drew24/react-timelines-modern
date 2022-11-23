import { FunctionComponent } from "react";
import { TimebarEntry, TimeSettings } from "../../../types";

import Row from "./Row";

interface Props {
  time: TimeSettings;
  rows: TimebarEntry[];
}

const Timebar: FunctionComponent<Props> = (props) => {
  const { time, rows } = props;
  return (
    <div className="rt-timebar">
      {rows.map((row) => {
        const { id, cells, style } = row;
        return <Row key={id} time={time} cells={cells} style={style} />;
      })}
    </div>
  );
};

export default Timebar;
