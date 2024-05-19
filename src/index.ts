import { getCreighton } from "./get-creighton";
import { getGospel } from "./get-gosptel";
import { createNotionPage } from "./create-notion-page";
import dotenv from "dotenv";
import { CronJob } from "cron";

dotenv.config();

// Get Universalis Gospel. Write to Notion.
// Get Creighton. Write to Notion.
// The above should not need to depend on each other. Eg if one fails, the other should still be able to write to Notion.

export const main = async () => {
  let creighton = { url: "", reflections: "" };
  let gospel = { url: "", reading: "", passage: "" };

  try {
    const response = await getCreighton();
    if (response) creighton = response;
  } catch (error) {
    console.error(error);
  }

  try {
    const response = await getGospel();
    if (response) gospel = response;
  } catch (error) {
    console.error(error);
  }

  // Returning await for the test
  return await createNotionPage(creighton, gospel);
};

new CronJob(
  "0 5 * * *",
  async function () {
    try {
      console.log(`Executing script at ${new Date().toLocaleString()}`);
      await main();
      console.log("Reflection successfully sent to Notion");
    } catch (error) {
      console.log(error);
      console.log("Error executing script");
    }
  },
  null,
  true,
  "Asia/Singapore",
);

console.log(`Container running on date: ${new Date()}`);
