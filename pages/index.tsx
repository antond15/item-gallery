import type { NextPage } from 'next';
import { PrismaClient } from '@prisma/client';
import Header from '../components/header';
import Grid from '../components/grid';
import type { IItem, ITag, IGridProps } from '../interfaces';

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
  // Temporary data
  const dummyItems: IItem[] = [
    {
      label: 'Armor',
      src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/armor.png',
      tags: [1, 2, 3, 4],
      description: 'Armor is a clothing worn on the body. It can be made of leather or metal.',
    },
    {
      label: 'Bandage',
      src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/bandage.png',
      tags: [2, 6, 7],
      description: 'Bandage is a piece of cloth used to bind or stitch wounds or injuries.',
    },
    {
      label: 'Onion',
      src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/onion.png',
      tags: [8],
      description: 'Onion is a vegetable that is used in cooking and baking.',
    },
    {
      label: 'Paperbag with long name',
      src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/paperbag.png',
      tags: [8, 1, 3],
      description: 'Paperbag is a type of paper made from a variety of materials.',
    },
    {
      label: 'Bullet',
      src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/ammo-9.png',
      tags: [13],
      description: 'Bullet is a type of ammunition used in firearms.',
    },
    {
      label: 'Wrong sized image',
      src: 'https://media.istockphoto.com/vectors/missing-rubber-stamp-vector-vector-id1213374148',
      tags: [4, 3, 2, 1, 0],
    },
  ];

  const prisma = new PrismaClient();

  const tags: ITag[] = [];
  const rawTags = await prisma.tag.findMany();
  rawTags.map(tag => tags[tag.id] = tag);

  return {
    props: {
      items: dummyItems,
      tags
    },
    revalidate: 30, // in seconds
  };
};
