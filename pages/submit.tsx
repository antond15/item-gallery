import type { NextPage, GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
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
