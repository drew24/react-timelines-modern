import { CSSProperties, FunctionComponent } from "react";

interface Timebar {
  id: string;
  title?: string;
}

type TimebarSettings = Timebar[];

type StickyProp =
  | { isSticky: false }
  | {
      isSticky: true;
      headerHeight: Required<CSSProperties>["height"];
      sidebarWidth: Required<CSSProperties>["width"];
    };
interface Props {
  timebar: TimebarSettings;
  sticky?: StickyProp;
}

function getStickyProps(stickyProp: StickyProp): {
  isSticky: boolean;
  headerHeight: Required<CSSProperties>["height"];
  sidebarWidth: Required<CSSProperties>["width"];
} {
  if (stickyProp.isSticky) {
    return {
      isSticky: true,
      headerHeight: stickyProp.headerHeight,
      sidebarWidth: stickyProp.sidebarWidth,
    };
  }
  return { isSticky: false, headerHeight: 0, sidebarWidth: 0 };
}

const Header: FunctionComponent<Props> = (props) => {
  const { sticky = { isSticky: false }, timebar } = props;
  const { headerHeight, isSticky, sidebarWidth } = getStickyProps(sticky);
  return (
    <div style={isSticky ? { paddingTop: headerHeight } : {}}>
      <div
        className={`rt-sidebar__header ${isSticky ? "rt-is-sticky" : ""}`}
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
