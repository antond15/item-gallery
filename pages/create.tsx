import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Text } from '@mantine/core';
import Header from '../components/header';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Text>Create new item page</Text>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
