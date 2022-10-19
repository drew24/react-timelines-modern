import { Component, ComponentPropsWithoutRef, MouseEvent } from 'react';
import createTime from '../../utils/time';

import Header from './Header';
import Body from './Body';
import NowMarker from './Marker/NowMarker';
import PointerMarker from './Marker/PointerMarker';
import getMouseX from '../../utils/getMouseX'
import getGrid from '../../utils/getGrid'

interface Props {
  now?: Date;
  time: ReturnType<typeof createTime>;
  timebar: ComponentPropsWithoutRef<typeof Header>['timebar'];
  tracks: ComponentPropsWithoutRef<typeof Body>['tracks'];
  sticky: ComponentPropsWithoutRef<typeof Header>['sticky'];
  clickElement: ComponentPropsWithoutRef<typeof Body>['clickElement'];
}

interface State {
  pointerDate: Date | null;
  pointerVisible: boolean;
  pointerHighlighted: boolean;
}

class Timeline extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      pointerDate: null,
      pointerVisible: false,
      pointerHighlighted: false,
    }
  }

  handleMouseMove = (e: MouseEvent) => {
    const { time } = this.props
    this.setState({ pointerDate: time.fromX(getMouseX(e)) })
  }

  handleMouseLeave = () => {
    this.setState({ pointerHighlighted: false })
  }

  handleMouseEnter = () => {
    this.setState({ pointerVisible: true, pointerHighlighted: true })
  }

  render() {
    const { now, time, timebar, tracks, sticky, clickElement } = this.props

    const { pointerDate, pointerVisible, pointerHighlighted } = this.state

    const grid = getGrid(timebar)
    debugger;
    return (
      <div className="rt-timeline" style={{ width: time.timelineWidthStyle }}>
        {now && <NowMarker now={now} visible time={time} />}
        {pointerDate && (
          <PointerMarker date={pointerDate} time={time} visible={pointerVisible} highlighted={pointerHighlighted} />
        )}
        <Header
          time={time}
          timebar={timebar}
          onMove={this.handleMouseMove}
          onEnter={this.handleMouseEnter}
          onLeave={this.handleMouseLeave}
          width={time.timelineWidthStyle}
          sticky={sticky}
        />
        <Body time={time} grid={grid} tracks={tracks} clickElement={clickElement} />
      </div>
    )
  }
}

export default Timeline;
