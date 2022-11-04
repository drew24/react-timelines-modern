import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  highlighted?: boolean;
  modifier: string;
  visible?: boolean;
  x: number;
}

export default function Marker(props: Props): JSX.Element {
  const { children, highlighted, modifier, visible, x } = props;
  return (
    <div
      className={`rt-marker rt-marker--${modifier} ${
        visible ? "rt-is-visible" : ""
      } ${highlighted ? "rt-is-highlighted" : ""}`}
      style={{ left: `${x}px` }}
    >
      <div className="rt-marker__label">
        <div className="rt-marker__content">{children}</div>
      </div>
    </div>
  );
}
