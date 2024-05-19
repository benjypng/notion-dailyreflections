import axios from "axios";
import { convert } from "html-to-text";
import { creightonGospelDate } from "./get-date";

export const getCreighton = async (): Promise<{
  url: string;
  reflections: string;
} | void> => {
  const url = `https://onlineministries.creighton.edu/CollaborativeMinistry/${creightonGospelDate(
    new Date(),
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
