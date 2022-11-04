import { ReactHTMLElement } from "react";

export interface Track<S extends HTMLElement = HTMLElement> {
  title: string;
  id: string;
  tracks?: Track[];
  isOpen?: boolean;
  hasButton?: boolean;
  sideComponent?: ReactHTMLElement<S>;
}
