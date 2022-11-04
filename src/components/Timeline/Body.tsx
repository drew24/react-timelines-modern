import { ComponentPropsWithoutRef, FunctionComponent } from "react";

import Tracks from "./Tracks";
import Grid from "./Grid/Grid";

interface Props {
  time: ComponentPropsWithoutRef<typeof Tracks>["time"];
  grid?: ComponentPropsWithoutRef<typeof Grid>["grid"];
  tracks?: ComponentPropsWithoutRef<typeof Tracks>["tracks"];
  clickElement?: ComponentPropsWithoutRef<typeof Tracks>["clickElement"];
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
