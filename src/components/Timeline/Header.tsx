import type { MouseEventHandler, RefObject } from "react";

import { createRef, PureComponent } from "react";

import { StickySettings, TimebarEntry, TimeSettings } from "../../types";

import Timebar from "./Timebar/Timebar";

const noop = () => {};

interface Props {
  onEnter: MouseEventHandler<HTMLDivElement>;
  onLeave: MouseEventHandler<HTMLDivElement>;
  onMove: MouseEventHandler<HTMLDivElement>;
  sticky: StickySettings;
  time: TimeSettings;
  timebar: TimebarEntry[];
  width: string;
}

class Header extends PureComponent<Props> {
  scroll: RefObject<HTMLDivElement>;

  timebar: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    this.scroll = createRef();
    this.timebar = createRef();
  }

  componentDidMount() {
    const { sticky } = this.props;
    if (sticky) {
      const currentOffsetHeight = this.timebar.current
        ? this.timebar.current.offsetHeight
        : 0;
      sticky.setHeaderHeight(currentOffsetHeight);
      const { scrollLeft, isSticky } = sticky;
      if (isSticky) {
        if (this.scroll.current) {
          this.scroll.current.scrollLeft = scrollLeft;
        }
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { sticky } = this.props;
    if (sticky) {
      const { scrollLeft, isSticky } = sticky;
      const prevScrollLeft = prevProps.sticky.scrollLeft;
      const prevIsSticky = prevProps.sticky.isSticky;
      if (scrollLeft !== prevScrollLeft || isSticky !== prevIsSticky) {
        if (this.scroll.current) {
          this.scroll.current.scrollLeft = scrollLeft;
        }
      }
    }
  }

  handleScroll = () => {
    const { sticky } = this.props;
    const targetScrollY = this.scroll.current
      ? this.scroll.current.scrollLeft
      : 0;
    sticky.handleHeaderScrollY(targetScrollY);
  };

  render() {
    const {
      time,
      onMove,
      onEnter,
      onLeave,
      width,
      timebar: rows,
      sticky,
    } = this.props;
    const { isSticky, headerHeight, viewportWidth } = sticky;
    return (
      <div
        style={isSticky ? { paddingTop: headerHeight } : {}}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div
          className={`rt-timeline__header ${isSticky ? "rt-is-sticky" : ""}`}
          style={isSticky ? { width: viewportWidth, height: headerHeight } : {}}
        >
          <div
            className="rt-timeline__header-scroll"
            ref={this.scroll}
            onScroll={isSticky ? this.handleScroll : noop}
          >
            <div ref={this.timebar} style={isSticky ? { width } : {}}>
              <Timebar time={time} rows={rows} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
