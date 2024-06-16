import { getCreighton } from "./get-creighton";
import { getGospel } from "./get-gosptel";
import { createNotionPage } from "./create-notion-page";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dotenv from "dotenv";

dotenv.config();
dayjs.extend(utc);
dayjs.extend(timezone);

// Get Universalis Gospel. Write to Notion.
// Get Creighton. Write to Notion.
// The above should not need to depend on each other. Eg if one fails, the other should still be able to write to Notion.

export const handler = async () => {
  console.log(`Container running on date: ${new Date()}`);
  const date = dayjs().tz("Asia/Singapore");

  let creighton = { url: "", reflections: "" };
  let gospel = { url: "", reading: "", passage: "" };

  try {
    const response = await getCreighton(date);
    if (response) creighton = response;
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await getGospel(date);
    if (response) gospel = response;
  } catch (error) {
    console.error(error);
  }

  // Returning await for the test
  return await createNotionPage(date, creighton, gospel);
};
