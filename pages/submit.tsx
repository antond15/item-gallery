import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { getToken } from 'next-auth/jwt';
import Header from '../components/header';
import SubmitPage from '../components/submit';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Item Gallery | Submit</title>
      </Head>

      <Header />
      <SubmitPage />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken(context);

  // Redirect back to homepage if not signed in
  if (!token) {
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
