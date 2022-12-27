import { DateTime } from "luxon";

export const getUnixTimeStamp = (date) => {
  return DateTime.fromJSDate(date).toMillis();
};

export const getFormattedDate = (date, type = null) => {
  switch (type) {
    case "amPm":
      return DateTime.fromMillis(date).toLocaleString(DateTime.DATETIME_MED);
    default:
      return DateTime.fromMillis(date).toFormat("LLL dd, yyyy");
  }
};