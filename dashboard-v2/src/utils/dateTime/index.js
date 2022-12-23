import { DateTime } from "luxon";

export const getUnixTimeStamp = (date) => {
    return DateTime.fromJSDate(date).toMillis()
}