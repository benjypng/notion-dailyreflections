import dayjs from "dayjs";
import { Dayjs } from "dayjs";

export const creightonGospelDate = (date: Dayjs) => {
  return dayjs(date).format("MMDDYY");
};

export const getYYYYMMDD = (date: Dayjs) => {
  return dayjs(date).format("YYYYMMDD");
};
