import { Client } from "@notionhq/client";
import { createEntry } from "./notion/create-entry";
import { appendHeadings } from "./notion/append-headings";
import { appendContent } from "./notion/append-content";
import { sleep } from "./sleep";
import { appendList } from "./notion/append-list";
import { Dayjs } from "dayjs";

export const createNotionPage = async (
  date: Dayjs,
  creighton: { url: string; reflections: string },
  gospel: { reading: string; url: string; passage: string },
): Promise<string> => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  try {
    const parentId = await createEntry(
      date,
      notion,
      gospel.reading,
      gospel.url,
      creighton.url,
    );

    // Handle rate limits
    console.log("Writing Gospel Reading");
    await appendHeadings(notion, parentId, "Gospel Reading");
    sleep(2000);
    await appendContent(notion, parentId, gospel.passage);
    sleep(2000);
    console.log("Writing Creighton Reflections");
    await appendHeadings(notion, parentId, "Creighton Reflections");
    sleep(2000);
    await appendContent(notion, parentId, creighton.reflections);
    sleep(2000);
    console.log("Writing Personal Reflections");
    await appendHeadings(notion, parentId, "Personal Reflections");
    sleep(2000);
    await appendContent(
      notion,
      parentId,
      "Reflect on where you felt God’s invitation in today’s readings. What is God inviting you to think, feel, or do differently in your life?",
    );
    sleep(2000);
    await appendList(notion, parentId, "...");
    sleep(2000);
    await appendContent(
      notion,
      parentId,
      "Recall a recent day that seemed ordinary but contained a moment that stood out, even if it was subtle. Describe this moment and why it caught your attention. What was happening around you, and what thoughts or feelings surfaced? How did this moment shift your usual routine or perspective? Explore the underlying significance of this event—why does it matter, and what does it reveal about you or your world? Consider how this story could be told to teach, persuade, or engage others, and how it represents a change or growth in your life.",
    );
    sleep(2000);
    await appendList(notion, parentId, "...");
    return "Reflection successfully sent to Notion";
  } catch (error) {
    console.error(error);
    throw new Error("Reflection not sent to Notion");
  }
};
