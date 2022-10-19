/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import createTime from "../../../utils/time";

import BasicElement from '../../Elements/Basic'

interface Props {
  time: ReturnType<typeof createTime>;
  style: ComponentPropsWithoutRef<typeof BasicElement>['style'];
  title: ComponentPropsWithoutRef<typeof BasicElement>['title'];
  start: ComponentPropsWithoutRef<typeof BasicElement>['start'];
  end: ComponentPropsWithoutRef<typeof BasicElement>['end'];
  classes: ComponentPropsWithoutRef<typeof BasicElement>['classes'];
  dataSet: ComponentPropsWithoutRef<typeof BasicElement>['dataSet'];
  tooltip: ComponentPropsWithoutRef<typeof BasicElement>['tooltip'];
  clickElement?: (props: Props) => void;
}

const Element: FunctionComponent<Props> = props => {
  const { time, style, title, start, end, classes, dataSet, tooltip, clickElement } = props

  const handleClick = () => {
    clickElement && clickElement(props)
  }
  const elementStyle = {
    ...time.toStyleLeftAndWidth(start, end),
    ...(clickElement ? { cursor: 'pointer' } : {}),
  }
  debugger;
  return (
    <div className="rt-track__element" style={elementStyle} onClick={clickElement && handleClick}>
      <BasicElement
        title={title}
        start={start}
        end={end}
        style={style}
        classes={classes}
        dataSet={dataSet}
        tooltip={tooltip}
      />
    </div>
  )
}

export default Element
