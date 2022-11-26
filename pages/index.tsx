import type { NextPage } from 'next';
import { prisma } from '@db';
import { useState } from 'react';
import Header from '@components/header';
import Search from '@components/grid/Search';
import Grid from '@components/grid';
import type { IItem } from '@interfaces';

type Props = {
  items: IItem[];
};

const Home: NextPage<Props> = (props: Props) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Header
        redirect="https://www.dejv.it/"
        content={<Search query={query} setQuery={setQuery} />}
      />
      <Grid items={props.items} query={query} />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const items = await prisma.item.findMany();

  return {
    props: { items },
  };
};
