import { ReactHTMLElement, ReactNode } from "react";

export interface Track<S extends HTMLElement = HTMLElement> {
  title: ReactNode;
  id: string;
  tracks?: Track[];
  isOpen?: boolean;
  hasButton?: boolean;
  sideComponent?: ReactHTMLElement<S>;
}
