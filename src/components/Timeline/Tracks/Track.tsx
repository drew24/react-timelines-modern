import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import Tracks from ".";
import Element from "./Element";

interface ElementPropsWithId extends ComponentPropsWithoutRef<typeof Element> {
  id: string;
}

interface TrackInterface {
  id: string;
  elements?: ElementPropsWithId[];
  isOpen?: boolean;
  tracks?: TrackInterface[];
}

interface Props {
  time: ComponentPropsWithoutRef<typeof Tracks>["time"];
  isOpen?: boolean;
  elements: ElementPropsWithId[];
  tracks: TrackInterface[];
  clickElement?: ComponentPropsWithoutRef<typeof Element>["clickElement"];
}

const Track: FunctionComponent<Props> = (props) => {
  const { time, elements, isOpen, tracks, clickElement } = props;
  return (
    <div className="tr-track">
      <div className="rt-track__elements">
        {elements
          .filter(({ start, end }) => end > start)
          .map((element) => {
            const {
              classes,
              clickElement: elementClickElement,
              dataSet,
              end,
              id,
              start,
              style,
              suffixContent,
              time: elementTime,
              title,
              tooltip,
            } = element;
            const selectedTime = elementTime || time;
            const selectedClickElement = elementClickElement || clickElement;
            return (
              <Element
                key={id}
                classes={classes}
                clickElement={selectedClickElement}
                dataSet={dataSet}
                end={end}
                start={start}
                style={style}
                suffixContent={suffixContent}
                time={selectedTime}
                title={title}
                tooltip={tooltip}
              />
            );
          })}
      </div>
      {isOpen && tracks && tracks.length > 0 && (
        <Tracks time={time} tracks={tracks} clickElement={clickElement} />
      )}
    </div>
  );
};

export default Track;
