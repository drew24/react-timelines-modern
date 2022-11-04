const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getMonth(date: Date): string {
  return monthNames[date.getMonth()];
}

export function getDayMonth(date: Date): string {
  return `${date.getDate()} ${getMonth(date)}`;
}
