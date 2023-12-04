import { Client } from "@notionhq/client";
import dayjs from "dayjs";

export const createEntry = async (
  notion: Client,
  gospelReading: string,
  gospelUrl: string,
  creightonUrl: string,
): Promise<string> => {
  const createdEntry = await notion.pages.create({
    parent: {
      database_id: process.env.DATABASE_ID as string,
    },
    properties: {
      "Gospel Reading": {
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: gospelReading,
            },
          },
        ],
      },
      Date: {
        type: "date",
        date: {
          start: dayjs(new Date()).format("YYYY-MM-DD"),
        },
      },
      Creighton: {
        type: "url",
        url: creightonUrl,
      },
      USCCB: {
        type: "url",
        url: gospelUrl,
      },
    },
  });
  return createdEntry.id;
};
