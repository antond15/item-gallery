import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;
  if (!data || typeof data !== 'object' || !data.id || !data.label || !data.image) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const token = await getToken({ req });
  if (!token?.sub || !process.env.ADMINS?.includes(token.sub)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await prisma.$transaction([
      prisma.item.create({
        data: {
          label: data.label,
          description: data.description,
          image: data.image,
          tags: data.tags,
        },
      }),
      prisma.itemRequest.delete({
        where: {
          id: data.id,
        },
      }),
    ]);
  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  return res.status(200).json({ message: 'OK' });
};

export default Handler;
