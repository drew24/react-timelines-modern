import { Component, ComponentPropsWithoutRef } from 'react';

import Controls from './components/Controls';
import Layout from './components/Layout';
import createTime from './utils/time';

const UNKNOWN_WIDTH = -1

interface Props {
  clickElement?: ComponentPropsWithoutRef<typeof Layout>['clickElement'];
  clickTrackButton?: ComponentPropsWithoutRef<typeof Layout>['clickTrackButton'];
  enableSticky?: ComponentPropsWithoutRef<typeof Layout>['enableSticky'];
  isOpen?: ComponentPropsWithoutRef<typeof Layout>['isOpen'];
  now?: ComponentPropsWithoutRef<typeof Layout>['now'];
  scale: {
    start: Date;
    end: Date;
    zoom: number;
    zoomMin: number;
    zoomMax: number;
  };
  scrollToNow?: ComponentPropsWithoutRef<typeof Layout>['scrollToNow'];
  timebar: ComponentPropsWithoutRef<typeof Layout>['timebar'];
  toggleOpen?: ComponentPropsWithoutRef<typeof Controls>['toggleOpen'];
  toggleTrackOpen?: ComponentPropsWithoutRef<typeof Layout>['toggleTrackOpen'];
  tracks: ComponentPropsWithoutRef<typeof Layout>['tracks'];
  zoomIn?: ComponentPropsWithoutRef<typeof Controls>['zoomIn'];
  zoomOut?: ComponentPropsWithoutRef<typeof Controls>['zoomOut'];
}

interface State {
  time: ReturnType<typeof createTime>;
  timelineViewportWidth: number;
  sidebarWidth: number;
}

class Timeline extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const timelineViewportWidth = UNKNOWN_WIDTH
    const sidebarWidth = UNKNOWN_WIDTH
    this.state = {
      time: createTime({ ...props.scale, viewportWidth: timelineViewportWidth }),
      timelineViewportWidth,
      sidebarWidth,
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { scale } = this.props
    const { timelineViewportWidth } = this.state

    if (nextProps.scale !== scale) {
      const time = createTime({
        ...nextProps.scale,
        viewportWidth: timelineViewportWidth,
      })
      this.setState({ time })
    }
  }

  handleLayoutChange: ComponentPropsWithoutRef<typeof Layout>['onLayoutChange'] = (settings, cb) => {
    const { timelineViewportWidth = UNKNOWN_WIDTH, sidebarWidth = UNKNOWN_WIDTH } = settings;
    const { scale } = this.props
    const time = createTime({
      ...scale,
      viewportWidth: timelineViewportWidth,
    })
    this.setState(
      {
        time,
        timelineViewportWidth,
        sidebarWidth,
      },
      cb
    )
  }

  render() {
    const {
      isOpen = true,
      toggleOpen,
      zoomIn,
      zoomOut,
      scale: { zoom, zoomMin, zoomMax },
      tracks,
      now,
      timebar,
      toggleTrackOpen,
      enableSticky = false,
      scrollToNow,
    } = this.props

    const { time, timelineViewportWidth, sidebarWidth } = this.state

    const { clickElement, clickTrackButton } = this.props

    debugger;
    return (
      <div className="rt">
        <Controls
          isOpen={isOpen}
          toggleOpen={toggleOpen}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          zoom={zoom}
          zoomMin={zoomMin}
          zoomMax={zoomMax}
        />
        <Layout
          enableSticky={enableSticky}
          now={now}
          tracks={tracks}
          timebar={timebar}
          toggleTrackOpen={toggleTrackOpen}
          scrollToNow={scrollToNow}
          time={time}
          isOpen={isOpen}
          onLayoutChange={this.handleLayoutChange}
          timelineViewportWidth={timelineViewportWidth}
          sidebarWidth={sidebarWidth}
          clickElement={clickElement}
          clickTrackButton={clickTrackButton}
        />
      </div>
    )
  }
}

export default Timeline;
