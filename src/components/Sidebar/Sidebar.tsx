
import HeaderOld from './Header'
import Body from './TrackKeys/Body'
import { ComponentPropsWithoutRef, FunctionComponent } from "react";

type Timebar = {
  id: string;
  title?: string;
}[];

interface Props {
  clickTrackButton?: () => void;
  sticky?: ComponentPropsWithoutRef<typeof HeaderOld>['sticky'];
  timebar: Timebar;
  toggleTrackOpen?: () => void;
  tracks?: ComponentPropsWithoutRef<typeof Body>['tracks'];
}

const Sidebar: FunctionComponent<Props> = (props) => {
  const {
    clickTrackButton,
    sticky,
    timebar,
    toggleTrackOpen,
    tracks,
  } = props;
  return (
    <div className="rt-sidebar">
    <HeaderOld timebar={timebar} sticky={sticky} />
    <Body tracks={tracks} toggleTrackOpen={toggleTrackOpen} clickTrackButton={clickTrackButton} />
  </div>
  );
};

export default Sidebar;
