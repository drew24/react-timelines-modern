import { cloneElement } from "react";

import TrackKeys from "./TrackKeys";
import setDefaultProperties, {
  DefaultProperties,
} from "../../../utils/setDefaultProperties";
import noop from "../../../utils/noop";
import { Track } from "./types";

interface Props {
  clickTrackButton?: (track: Track) => void;
  toggleOpen?: (track: Track) => void;
  track: Track;
}

const DEFAULT_PROPS: DefaultProperties<Props> = {
  clickTrackButton: noop,
  toggleOpen: noop,
};

export default function TrackKey(props: Props): JSX.Element {
  const { track, toggleOpen, clickTrackButton } = setDefaultProperties(
    props,
    DEFAULT_PROPS
  );
  const { title, tracks, isOpen, hasButton, sideComponent } = track;
  const isExpandable = isOpen !== undefined;

  const buildSideComponent = () => {
    if (sideComponent) {
      return cloneElement(sideComponent);
    }
    if (hasButton && clickTrackButton) {
      const handleClick = () => clickTrackButton(track);
      return (
        <button
          className="rt-track-key__side-button"
          onClick={handleClick}
          type="button"
        />
      );
    }

    return null;
  };

  return (
    <li className="rt-track-key">
      <div className="rt-track-key__entry">
        {isExpandable && (
          <button
            title="Expand track"
            className={`rt-track-key__toggle ${
              isOpen
                ? "rt-track-key__toggle--close"
                : "rt-track-key__toggle--open"
            }`}
            onClick={() => toggleOpen(track)}
            type="button"
          >
            {isOpen ? "Close" : "Open"}
          </button>
        )}
        <span className="rt-track-key__title">{title}</span>
        {buildSideComponent()}
      </div>
      {isOpen && tracks && tracks.length > 0 && (
        <TrackKeys tracks={tracks} toggleOpen={toggleOpen} />
      )}
    </li>
  );
}
