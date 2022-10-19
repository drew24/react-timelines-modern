import { FunctionComponent } from "react";
import setDefaultProperties, { DefaultProperties } from "../../utils/setDefaultProperties";

interface Timebar {
  id: string;
  title?: string;
}

type TimebarSettings = Timebar[];

interface StickySettings {
  isSticky: boolean;
  headerHeight: number;
  sidebarWidth: number;
}

interface Props {
  timebar: TimebarSettings;
  sticky?: StickySettings;
}

const DEFAULT_PROPS: DefaultProperties<Props> = {
  sticky: {
    isSticky: false,
    headerHeight: 0,
    sidebarWidth: 0,
  },
};

const Header: FunctionComponent<Props> = (props) => {
  const { sticky, timebar } = setDefaultProperties(props, DEFAULT_PROPS);
  const {
    isSticky,
    headerHeight,
    sidebarWidth,
  } = sticky;
  return (
    <div style={isSticky ? { paddingTop: headerHeight } : {}}>
    <div
      className={`rt-sidebar__header ${isSticky ? 'rt-is-sticky' : ''}`}
      style={isSticky ? { width: sidebarWidth } : {}}
    >
      {timebar.map(({ id, title }) => (
        <div key={id} className="rt-timebar-key">
          {title}
        </div>
      ))}
    </div>
  </div>
  );
};

export default Header;
