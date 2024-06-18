import { Client } from '@notionhq/client'

import { sleep } from '../sleep'
import { splitLongString } from '../split-long-string'

export const appendContent = async (
  notion: Client,
  parentId: string,
  text: string,
): Promise<void> => {
  const appendChildren = async (text: string) => {
    await notion.blocks.children.append({
      block_id: parentId,
      children: [
        {
          object: 'block',
          paragraph: {
            rich_text: [
              {
                text: {
                  content: text,
                },
              },
            ],
          },
        },
      ],
    })
  }

  if (text.length > 2000) {
    console.log('Long text')
    const textArr = splitLongString(text, 1999)
    for (const t of textArr) {
      await sleep(2000)
      await appendChildren(t)
      await sleep(2000)
    }
  } else {
    console.log('Short text')
    await appendChildren(text)
  }
}
