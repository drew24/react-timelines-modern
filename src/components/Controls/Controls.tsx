import Toggle from './Toggle'
import ZoomIn from './ZoomIn'
import ZoomOut from './ZoomOut'
import setDefaultProperties, { DefaultProperties } from "../../utils/setDefaultProperties"
import noop from "../../utils/noop";
import { ComponentPropsWithoutRef } from "react";

interface Props {
  isOpen?: ComponentPropsWithoutRef<typeof Toggle>['isOpen'];
  toggleOpen?: ComponentPropsWithoutRef<typeof Toggle>['toggleOpen'];
  zoom: number;
  zoomIn?: ComponentPropsWithoutRef<typeof ZoomIn>['zoomIn'];
  zoomMax?: ComponentPropsWithoutRef<typeof ZoomIn>['zoomMax'];
  zoomMin?: ComponentPropsWithoutRef<typeof ZoomOut>['zoomMin'];
  zoomOut?: ComponentPropsWithoutRef<typeof ZoomOut>['zoomOut'];
}

const DEFAULT_PROPERTIES: DefaultProperties<Props> = {
  isOpen: true,
  toggleOpen: noop,
  zoomIn: noop,
  zoomMax: 0,
  zoomMin: 0,
  zoomOut: noop,
};

export default function Controls(props: Props) {
  const { isOpen, toggleOpen, zoom, zoomIn, zoomMax, zoomMin, zoomOut } = setDefaultProperties(props, DEFAULT_PROPERTIES);
  return (
    <div className="rt-controls">
    <div className="rt-controls__content">
      {toggleOpen && <Toggle isOpen={isOpen} toggleOpen={toggleOpen} />}
      {zoomIn && <ZoomIn zoomIn={zoomIn} zoomMax={zoomMax} zoom={zoom} />}
      {zoomOut && <ZoomOut zoomOut={zoomOut} zoomMin={zoomMin} zoom={zoom} />}
    </div>
  </div>
  );
}
