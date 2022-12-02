import Header from "./Header";
import Body from "./TrackKeys/Body";
import { CSSProperties, FunctionComponent } from "react";
import { Track } from "../../types";
import { ClickTrackHandler } from "./TrackKeys/TrackKey";

type Timebar = {
  id: string;
  title?: string;
}[];

type StickyProp =
  | {
      isSticky: true;
      headerHeight: Required<CSSProperties>["height"];
      sidebarWidth: Required<CSSProperties>["width"];
    }
  | { isSticky: false };
interface Props {
  clickTrackButton?: ClickTrackHandler;
  sticky?: StickyProp;
  timebar: Timebar;
  toggleTrackOpen?: () => void;
  tracks?: Track[];
}

const Sidebar: FunctionComponent<Props> = (props) => {
  const { clickTrackButton, sticky, timebar, toggleTrackOpen, tracks } = props;
  return (
    <div className="rt-sidebar">
      <Header timebar={timebar} sticky={sticky} />
      <Body
        tracks={tracks}
        toggleTrackOpen={toggleTrackOpen}
        clickTrackButton={clickTrackButton}
      />
    </div>
  );
};

export default Sidebar;
