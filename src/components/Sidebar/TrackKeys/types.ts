import { ReactHTMLElement } from "react";

export interface Track {
  title: string;
  id: string;
  tracks?: Track[];
  isOpen?: boolean;
  hasButton?: boolean;
  sideComponent?: ReactHTMLElement<any>;
}
