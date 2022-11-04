import createTime from "../../../utils/time";

interface Props {
  time: ReturnType<typeof createTime>;
  grid: {
    id: string;
    start: Date;
    end: Date;
  }[];
}

export default function Grid(props: Props): JSX.Element {
  const { grid, time } = props;
  return (
    <div className="rt-grid">
      {grid.map(({ id, start, end }) => (
        <div
          key={id}
          className="rt-grid__cell"
          style={time.toStyleLeftAndWidth(start, end)}
        />
      ))}
    </div>
  );
}
