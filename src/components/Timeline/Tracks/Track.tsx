import { ComponentPropsWithoutRef, FunctionComponent } from "react"
import Tracks from '.'
import Element from './Element'

interface Element extends ComponentPropsWithoutRef<typeof Element> {
  id: string;
}

interface Track {
  id: string;
  elements?: Element[];
  isOpen?: boolean;
  tracks?: Track[];
}

interface Props {
  time: ComponentPropsWithoutRef<typeof Tracks>['time'];
  isOpen?: boolean;
  elements: Element[];
  tracks: Track[];
  clickElement?: ComponentPropsWithoutRef<typeof Element>['clickElement'];
}

const Track: FunctionComponent<Props> = ({ time, elements, isOpen, tracks, clickElement }) => (
  <div className="tr-track">
    <div className="rt-track__elements">
      {elements
        .filter(({ start, end }) => end > start)
        .map(element => {
          const {
            classes,
            clickElement,
            dataSet,
            end,
            id,
            start,
            style,
            time: elementTime,
            title,
            tooltip,
          } = element; 
          const selectedTime = elementTime || time;
          debugger;
          return (
            <Element key={id}
              classes={classes}
              clickElement={clickElement}
              dataSet={dataSet}
              end={end}
              start={start}
              style={style}
              time={selectedTime}
              title={title}
              tooltip={tooltip}
            />
          );
        })}
    </div>
    {isOpen && tracks && tracks.length > 0 && <Tracks time={time} tracks={tracks} clickElement={clickElement} />}
  </div>
)

export default Track;
