// Get tags from cache

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@db';
import { ITagCache } from '@interfaces';

let fetched = false;
let cachedTags: ITagCache[] = [];

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (fetched) {
    return res.status(200).json(cachedTags);
  } else {
    fetched = true;
    cachedTags = [];
    const rawTags = await prisma.tag.findMany();
    rawTags.map(
      (tag, index) =>
        (cachedTags[index] = {
          label: tag.label,
          value: tag.id,
        })
    );

    return res.status(200).json(cachedTags);
  }
};

export default Handler;
