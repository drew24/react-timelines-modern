import { TimeSettings } from "../types";

interface CreateTimeParameters {
  end: Date;
  minWidth?: number;
  start: Date;
  viewportWidth?: number;
  zoom: number;
}

const MILLIS_IN_A_DAY = 24 * 60 * 60 * 1000;

function getTimelineWidth(settings: CreateTimeParameters): number {
  const { start, end, zoom, viewportWidth = 0, minWidth = 0 } = settings;
  const duration = end.valueOf() - start.valueOf();
  const days = duration / MILLIS_IN_A_DAY;
  const daysZoomWidth = days * zoom;

  if (daysZoomWidth > viewportWidth) {
    return daysZoomWidth >= minWidth ? daysZoomWidth : minWidth;
  } else {
    return viewportWidth >= minWidth ? viewportWidth : minWidth;
  }
}

const create = (settings: CreateTimeParameters): TimeSettings => {
  const { start, end, zoom } = settings;
  const duration = end.valueOf() - start.valueOf();

  const timelineWidth = getTimelineWidth(settings);

  const timelineWidthStyle = `${timelineWidth}px`;

  const toX = (from: Date) => {
    const value = (from.valueOf() - start.valueOf()) / duration;
    return Math.round(value * timelineWidth);
  };

  const toStyleLeft = (from: Date) => ({
    left: `${toX(from)}px`,
  });

  const toStyleLeftAndWidth = (from: Date, to: Date) => {
    const left = toX(from);
    return {
      left: `${left}px`,
      width: `${toX(to) - left}px`,
    };
  };

  const fromX = (x: number) =>
    new Date(start.getTime() + (x / timelineWidth) * duration);

  return {
    timelineWidth,
    timelineWidthStyle,
    start,
    end,
    zoom,
    toX,
    toStyleLeft,
    toStyleLeftAndWidth,
    fromX,
  };
};

export default create;
