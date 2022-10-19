import createTime from "../../../utils/time";

import { getDayMonth } from '../../../utils/formatDate';
import Marker from './Marker';

interface Props {
  time: ReturnType<typeof createTime>;
  date: Date;
  visible?: boolean;
  highlighted?: boolean;
}

export default function PointerMarker(props: Props): JSX.Element {
  const { time, date, visible, highlighted } = props;
  return (
    <Marker modifier="pointer" x={time.toX(date)} visible={visible} highlighted={highlighted}>
    <div>
      <div>
        <strong>{getDayMonth(date)}</strong>
      </div>
    </div>
  </Marker>
  );
}
