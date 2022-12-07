type EventListener<K extends keyof WindowEventMap> = (
  this: Window,
  event: WindowEventMap[K]
) => void;

export function addListener<EventType extends keyof WindowEventMap>(
  type: EventType,
  listener: EventListener<EventType>
) {
  return window.addEventListener(type, listener);
}

export function removeListener<EventType extends keyof WindowEventMap>(
  type: EventType,
  listener: EventListener<EventType>
) {
  window.removeEventListener(type, listener);
}
