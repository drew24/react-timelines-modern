import createTime from "../../../utils/time";
import PropTypes from "prop-types";

import Marker from "./Marker";
import { getDayMonth } from "../../../utils/formatDate";

interface Props {
  time: ReturnType<typeof createTime>;
  visible: boolean;
  now: Date;
}

export default function NowMarker(props: Props): JSX.Element {
  const { now, time, visible } = props;
  return (
    <Marker modifier="now" x={time.toX(now)} visible={visible}>
      <div>
        <div>Today</div>
        <strong>{getDayMonth(now)}</strong>
      </div>
    </Marker>
  );
}

NowMarker.propTypes = {
  time: PropTypes.shape({
    toX: PropTypes.func.isRequired,
  }).isRequired,
  visible: PropTypes.bool.isRequired,
  now: PropTypes.instanceOf(Date).isRequired,
};
