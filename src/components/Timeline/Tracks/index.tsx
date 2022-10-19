
import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import createTime from "../../../utils/time";
import Track from './Track'

interface Props {
  time: ReturnType<typeof createTime>;
  tracks?: ComponentPropsWithoutRef<typeof Track>['tracks'];
  clickElement?: ComponentPropsWithoutRef<typeof Track>['clickElement'];
}
const Tracks: FunctionComponent<Props> = (props) => {
  const { time, tracks, clickElement } = props;
  debugger;
  return (
    <div className="rt-tracks">
      {tracks && tracks.map((track) => {
        const { id, elements = [], isOpen, tracks: childTracks = []} = track;
        return (
          <Track key={id} time={time} elements={elements} isOpen={isOpen} tracks={childTracks} clickElement={clickElement} />
        );
      })}
  </div>
  );
};

export default Tracks
