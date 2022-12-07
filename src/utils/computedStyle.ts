export default function computedStyle(
  node: Element,
  pseudoElement?: string | null
) {
  return window.getComputedStyle(node, pseudoElement);
}
