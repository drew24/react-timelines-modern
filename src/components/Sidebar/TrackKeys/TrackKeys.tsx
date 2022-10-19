import { ComponentPropsWithoutRef } from "react";
import TrackKey from './TrackKey'

type Track = ComponentPropsWithoutRef<typeof TrackKey>['track'];

interface Props {
  tracks: Track[];
  toggleOpen?: (track: Track) => void;
  clickTrackButton?: (track: Track) => void;
}

export default function TrackKeys(props: Props): JSX.Element {
  const { tracks, toggleOpen, clickTrackButton } = props;
  return (
    <ul className="rt-track-keys">
    {tracks.map(track => (
      <TrackKey key={track.id} track={track} toggleOpen={toggleOpen} clickTrackButton={clickTrackButton} />
    ))}
  </ul>
  );
}
