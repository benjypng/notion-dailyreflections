import { Client } from "@notionhq/client";
import dayjs from "dayjs";

export const createEntry = async (
  date: Date,
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
          start: dayjs(date).format("YYYY-MM-DD"),
        },
      },
      Creighton: {
        type: "url",
        url: creightonUrl,
      },
      Universalis: {
        type: "url",
        url: gospelUrl,
      },
    },
    icon: {
      type: "emoji",
      emoji: "✝️",
    },
  });
  return createdEntry.id;
};
