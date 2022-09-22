import type { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Header from '../components/header';
import SubmitForm from '../components/submit';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <SubmitForm />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // Redirect back to homepage if not signed in
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
