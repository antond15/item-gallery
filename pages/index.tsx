import type { NextPage } from 'next';
import { PrismaClient } from '@prisma/client';
import Header from '../components/header';
import Grid from '../components/grid';
import type { ITag, IGridProps } from '../interfaces';

const Home: NextPage<IGridProps> = (props: IGridProps) => {
  return (
    <>
      <Header />
      <Grid {...props} />
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
