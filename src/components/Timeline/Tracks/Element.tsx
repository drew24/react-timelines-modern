import { ComponentPropsWithoutRef, FunctionComponent } from "react";
import createTime from "../../../utils/time";

import BasicElement from "../../Elements/Basic";

interface Props {
  time?: ReturnType<typeof createTime>;
  style?: ComponentPropsWithoutRef<typeof BasicElement>["style"];
  title?: ComponentPropsWithoutRef<typeof BasicElement>["title"];
  start: ComponentPropsWithoutRef<typeof BasicElement>["start"];
  end: ComponentPropsWithoutRef<typeof BasicElement>["end"];
  classes?: ComponentPropsWithoutRef<typeof BasicElement>["classes"];
  dataSet?: ComponentPropsWithoutRef<typeof BasicElement>["dataSet"];
  suffixContent?: ComponentPropsWithoutRef<
    typeof BasicElement
  >["suffixContent"];
  tooltip?: ComponentPropsWithoutRef<typeof BasicElement>["tooltip"];
  clickElement?: (props: Props) => void;
}

const Element: FunctionComponent<Props> = (props) => {
  const {
    time,
    style,
    title = "",
    start,
    end,
    classes,
    dataSet = {},
    suffixContent,
    tooltip,
    clickElement,
  } = props;

  const handleClick = () => {
    if (clickElement) {
      clickElement(props);
    }
  };
  const styleLeftAndWidth = time ? time.toStyleLeftAndWidth(start, end) : {};
  const elementStyle = {
    ...styleLeftAndWidth,
    ...(clickElement ? { cursor: "pointer" } : {}),
  };
  return (
    <div
      className="rt-track__element"
      style={elementStyle}
      onClick={clickElement && handleClick}
    >
      <BasicElement
        title={title}
        start={start}
        end={end}
        style={style}
        classes={classes}
        dataSet={dataSet}
        suffixContent={suffixContent}
        tooltip={tooltip}
      />
    </div>
  );
};

export default Element;
