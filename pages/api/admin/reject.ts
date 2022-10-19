// Reject item request from 'api/user/submit'

import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data = req.body;
  if (!data || typeof data !== 'object' || !data.id) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const token = await getToken({ req });
  if (!token?.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const removed = await prisma.itemRequest.delete({
    where: {
      id: data.id,
    },
  });

  if (removed) {
    return res.status(200).json({ message: 'OK' });
  } else {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default Handler;
