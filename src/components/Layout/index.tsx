import React, {  ComponentPropsWithoutRef, PureComponent } from 'react'

import Sidebar from '../Sidebar/Sidebar'
import Timeline from '../Timeline'
import { addListener, removeListener } from '../../utils/events'
import raf from '../../utils/raf'
import getNumericPropertyValue from '../../utils/getNumericPropertyValue'
import { Track } from "../Sidebar/TrackKeys/types"

const noop = () => {}

interface Props {
  enableSticky: boolean;
  isOpen?: boolean;
  timebar: ComponentPropsWithoutRef<typeof Sidebar>['timebar'] & ComponentPropsWithoutRef<typeof Timeline>['timebar'];
  time: ComponentPropsWithoutRef<typeof Timeline>['time'];
  tracks: Track[];
  now: ComponentPropsWithoutRef<typeof Timeline>['now'];
  toggleTrackOpen?: () => void;
  scrollToNow?: boolean;
  onLayoutChange: (settings: LayoutChangeSettings, callback: () => void) => void;
  sidebarWidth?: number;
  timelineViewportWidth?: number;
  clickElement: ComponentPropsWithoutRef<typeof Timeline>['clickElement'];
  clickTrackButton?: () => void;
}

interface State {
  isSticky: boolean;
  headerHeight: number;
  scrollLeft: number;
}

interface LayoutChangeSettings {
  timelineViewportWidth?: number;
  sidebarWidth?: number;
}

class Layout extends PureComponent<Props, State> {
  timeline: React.RefObject<HTMLDivElement>;
  layout: React.RefObject<HTMLDivElement>;
  sidebar: React.RefObject<HTMLDivElement>;
  props: Props;
  state: State;
  constructor(props: Props) {
    super(props)

    this.timeline = React.createRef()
    this.layout = React.createRef()
    this.sidebar = React.createRef()

    this.state = {
      isSticky: false,
      headerHeight: 0,
      scrollLeft: 0,
    }
  }

  componentDidMount() {
    const { enableSticky } = this.props

    if (enableSticky) {
      addListener('scroll', this.handleScrollY)
      this.updateTimelineHeaderScroll()
      this.updateTimelineBodyScroll()
    }

    addListener('resize', this.handleResize)
    this.handleLayoutChange(() => this.scrollToNow())
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { enableSticky, isOpen } = this.props
    const { isSticky, scrollLeft } = this.state

    if (enableSticky && isSticky) {
      if (!prevState.isSticky) {
        this.updateTimelineHeaderScroll()
      }

      if (scrollLeft !== prevState.scrollLeft) {
        this.updateTimelineBodyScroll()
      }
    }

    if (isOpen !== prevProps.isOpen) {
      this.handleLayoutChange()
    }
  }

  componentWillUnmount() {
    const { enableSticky } = this.props

    if (enableSticky) {
      removeListener('scroll', this.handleScrollY)
      removeListener('resize', this.handleResize)
    }
  }

  setHeaderHeight = (headerHeight: number) => {
    this.setState({ headerHeight })
  }

  scrollToNow = () => {
    const { time, scrollToNow, now, timelineViewportWidth } = this.props
    if (!this.timeline.current || !now || !timelineViewportWidth) {
      return;
    }
    if (scrollToNow) {
      this.timeline.current.scrollLeft = time.toX(now) - 0.5 * timelineViewportWidth
    }
  }

  updateTimelineBodyScroll = () => {
    const { scrollLeft } = this.state
    if (!this.timeline.current) {
      return;
    }
    this.timeline.current.scrollLeft = scrollLeft
  }

  updateTimelineHeaderScroll = () => {
    if (!this.timeline.current) {
      return;
    }
    const { scrollLeft } = this.timeline.current
    this.setState({ scrollLeft })
  }

  handleHeaderScrollY = (scrollLeft: number) => {
    raf(() => {
      this.setState({ scrollLeft })
    })
  }

  handleScrollY = () => {
    raf(() => {
      const { headerHeight } = this.state
      const markerHeight = 0;
      if (!this.timeline.current) {
        return;
      }
      const { top, bottom } = this.timeline.current.getBoundingClientRect();
      const isSticky = top <= -markerHeight && bottom >= headerHeight
      this.setState(() => ({ isSticky }))
    })
  }

  handleScrollX = () => {
    raf(this.updateTimelineHeaderScroll)
  }

  calculateSidebarWidth = () => {
    if (!this.sidebar.current || !this.layout.current) {
      return;
    }
    return this.sidebar.current.offsetWidth + getNumericPropertyValue(this.layout.current, 'margin-left')
  }
    

  calculateTimelineViewportWidth = () => {
    if (!this.timeline.current) {
      return;
    }
    return this.timeline.current.offsetWidth;
  };

  handleLayoutChange = (cb = noop) => {
    const { sidebarWidth, timelineViewportWidth, onLayoutChange } = this.props

    const nextSidebarWidth = this.calculateSidebarWidth()
    const nextTimelineViewportWidth = this.calculateTimelineViewportWidth()
    if (nextSidebarWidth !== sidebarWidth || nextTimelineViewportWidth !== timelineViewportWidth) {
      onLayoutChange(
        {
          sidebarWidth: this.calculateSidebarWidth(),
          timelineViewportWidth: this.calculateTimelineViewportWidth(),
        },
        cb,
      )
    }
  }

  handleResize = () => this.handleLayoutChange()

  render() {
    const {
      isOpen,
      tracks,
      now,
      time,
      timebar,
      toggleTrackOpen,
      sidebarWidth = 0,
      timelineViewportWidth = 0,
      clickElement,
      clickTrackButton,
    } = this.props

    const { isSticky, headerHeight, scrollLeft } = this.state
    debugger;
    return (
      <div className={`rt-layout ${isOpen ? 'rt-is-open' : ''}`} ref={this.layout}>
        <div className="rt-layout__side" ref={this.sidebar}>
          <Sidebar
            timebar={timebar}
            tracks={tracks}
            toggleTrackOpen={toggleTrackOpen}
            sticky={{ isSticky, headerHeight, sidebarWidth }}
            clickTrackButton={clickTrackButton}
          />
        </div>
        <div className="rt-layout__main">
          <div className="rt-layout__timeline" ref={this.timeline} onScroll={isSticky ? this.handleScrollX : noop}>
            <Timeline
              now={now}
              time={time}
              timebar={timebar}
              tracks={tracks}
              sticky={{
                isSticky,
                setHeaderHeight: this.setHeaderHeight,
                viewportWidth: timelineViewportWidth,
                handleHeaderScrollY: this.handleHeaderScrollY,
                headerHeight,
                scrollLeft,
              }}
              clickElement={clickElement}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Layout
