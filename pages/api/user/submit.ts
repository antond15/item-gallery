// Submit item request

import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@db';
import type { ISubmit } from '@interfaces';
import validate from '@validation/schemas/submit';

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data: ISubmit = req.body;
  if (!validate(data)) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const token = await getToken({ req });
  if (!token?.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const newRequest = await prisma.itemRequest.create({
    data: {
      name: data.name,
      label: data.label,
      description: data.description,
      image: data.image,
      tags: data.tags,
      weight: data.weight,
      userId: token.sub,
    },
  });

  if (newRequest) {
    return res.status(200).json({ message: 'OK' });
  } else {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default Handler;
