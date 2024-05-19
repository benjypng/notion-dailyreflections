import dayjs from "dayjs";

export const creightonGospelDate = (date: Date) => {
  return dayjs(date).format("MMDDYY");
};

export const getYYYYMMDD = (date: Date) => {
  return dayjs(date).format("YYYYMMDD");
};
