import type { NextPage } from 'next';
import { prisma } from '@db';
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
      <Header query={query} setQuery={setQuery} />
      <Grid items={props.items} tags={props.tags} query={query} />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const items = await prisma.item.findMany();

  const tags: ITag[] = [];
  const rawTags = await prisma.tag.findMany();
  rawTags.map(
    (tag) =>
      (tags[tag.id] = {
        label: tag.label,
        color: tag.color,
      })
  );

  return {
    props: {
      items,
      tags,
    },
  };
};
