import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';
import { IRequest } from '../../../interfaces';

const prisma = new PrismaClient();

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data: IRequest = req.body;
  if (!data || typeof data !== 'object' || !data.id || !data.name || !data.label || !data.image) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const token = await getToken({ req });
  const admins = process.env.ADMINS?.split(', ');
  if (!token?.email || !admins?.includes(token.email)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await prisma.$transaction([
      prisma.item.create({
        data: {
          name: data.name,
          label: data.label,
          description: data.description,
          image: data.image,
          tags: data.tags,
          weight: data.weight,
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

  await res.revalidate('/');
  return res.status(200).json({ message: 'OK' });
};

export default Handler;
