export default function raf(cb: FrameRequestCallback) {
  return window.requestAnimationFrame(cb);
}
