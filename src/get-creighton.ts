import axios from "axios";
import { convert } from "html-to-text";
import { creightonGospelDate } from "./get-date";
import { Dayjs } from "dayjs";

export const getCreighton = async (
  date: Dayjs,
): Promise<{
  url: string;
  reflections: string;
} | void> => {
  const url = `https://onlineministries.creighton.edu/CollaborativeMinistry/${creightonGospelDate(
    date,
  )}.html`;
  try {
    const response = await axios.get(url);
    const reflections = convert(response.data, {
      baseElements: { selectors: ["td.Reflection-text"] },
      wordwrap: false,
    });
    return { url, reflections };
  } catch (error) {
    console.error(error);
  }
};
