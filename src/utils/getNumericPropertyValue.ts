import computedStyle from './computedStyle'

export default function getNumericPropertyValue(node: Element, prop: string) {
  return parseInt(computedStyle(node).getPropertyValue(prop), 10);
}
