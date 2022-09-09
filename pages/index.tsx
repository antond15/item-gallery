import type { NextPage } from 'next';
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';
import Header from '../components/header';
import Grid from '../components/grid';
import type { IItem, ITag } from '../interfaces';

type Props = {
  items: IItem[];
  tags: ITag[];
};

const Home: NextPage<Props> = (props: Props) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Header setQuery={setQuery} />
      <Grid items={props.items} tags={props.tags} query={query} />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const prisma = new PrismaClient();

  const items = await prisma.item.findMany();

  const tags: ITag[] = [];
  const rawTags = await prisma.tag.findMany();
  rawTags.map((tag) => (tags[tag.id] = tag));

  return {
    props: {
      items,
      tags,
    },
    revalidate: 3600, // 60 minut
  };
};
