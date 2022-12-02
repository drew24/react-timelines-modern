import { FunctionComponent } from "react";

import Tracks from "./Tracks";
import Grid from "./Grid/Grid";
import { Cell, TimeSettings, Track } from "../../types";
import { ClickElementHandler } from "./Tracks/Element";

interface Props {
  time: TimeSettings;
  grid?: Cell[];
  tracks?: Track[];
  clickElement?: ClickElementHandler;
}

const Body: FunctionComponent<Props> = (props) => {
  const { time, grid, tracks, clickElement } = props;
  return (
    <div className="rt-timeline__body">
      {grid && <Grid time={time} grid={grid} />}
      <Tracks time={time} tracks={tracks} clickElement={clickElement} />
    </div>
  );
};

export default Body;
