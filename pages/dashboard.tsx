import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { PrismaClient } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { IRequest } from '../interfaces';
import Header from '../components/header';
import Dashboard from '../components/dashboard';

type Props = {
  requests: IRequest[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Item Gallery | Dashboard</title>
      </Head>

      <Header />
      <Dashboard {...props} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken(context);

  // Redirect back to homepage if not authorized
  const admins = process.env.ADMINS?.split(', ');
  if (!token?.email || !admins?.includes(token.email)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const prisma = new PrismaClient();

  const rawRequests = await prisma.itemRequest.findMany();
  const requests: IRequest[] = [];

  rawRequests.forEach((request, index) => {
    requests[index] = {
      id: request.id,
      label: request.label,
      description: request.description!,
      image: request.image,
      tags: request.tags as number[],
      userId: request.userId,
      submitedAt: request.submitedAt.toISOString(),
    };
  });

  return {
    props: {
      requests,
    },
  };
};
