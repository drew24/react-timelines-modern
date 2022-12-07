import createTime from "../../../utils/time";

interface Props {
  end: Date;
  start: Date;
  time: ReturnType<typeof createTime>;
  title: string;
}

export default function Cell(props: Props): JSX.Element {
  const { time, title, start, end } = props;
  return (
    <div
      className="rt-timebar__cell"
      style={time.toStyleLeftAndWidth(start, end)}
    >
      {title}
    </div>
  );
}
