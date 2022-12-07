import { FunctionComponent } from "react";
import { TimeSettings, Track as TrackInterface } from "../../../types";
import { ClickElementHandler } from "./Element";

import TrackComponent from "./Track";

interface Props {
  clickElement?: ClickElementHandler;
  time: TimeSettings;
  tracks?: TrackInterface[];
}
const Tracks: FunctionComponent<Props> = (props) => {
  const { clickElement, time, tracks } = props;
  return (
    <div className="rt-tracks">
      {tracks &&
        tracks.map((track) => {
          const { elements = [], id, isOpen, tracks: childTracks = [] } = track;
          return (
            <TrackComponent
              clickElement={clickElement}
              elements={elements}
              isOpen={isOpen}
              key={id}
              time={time}
              tracks={childTracks}
            />
          );
        })}
    </div>
  );
};

export default Tracks;
