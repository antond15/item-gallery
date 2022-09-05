import type { NextPage } from 'next';
import { useMantineTheme, Box, ScrollArea, SimpleGrid } from '@mantine/core';
import HoverTarget from './HoverTarget';

// Temporary dummy data
const data = [
  {
    label: 'Armor',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/armor.png',
    tags: ['furniture', 'clothing', 'vegetable', 'food', 'vehicle', 'weapon', 'utility', 'tools'],
    description:
      'Armor is a type of clothing worn on the body. It can be made of leather, cloth, or metal.',
  },
  {
    label: 'Bandage',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/bandage.png',
    tags: ['tag1', 'tag2', 'tag3'],
    description:
      'A bandage is a piece of cloth, or metal that is used to bind or stitch wounds or injuries.',
  },
  {
    label: 'Onion',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/onion.png',
    tags: ['tag1'],
    description: 'Onion is a vegetable that is used in cooking and baking.',
  },
  {
    label: 'Paperbag with long name',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/paperbag.png',
    tags: ['tag1', 'tag2', 'tag3'],
    description: 'Paperbag is a type of paper made from a variety of materials.',
  },
  {
    label: 'Bullet',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/ammo-9.png',
    tags: ['tag1', 'tag2', 'tag3'],
    description: 'Bullet is a type of ammunition used in firearms.',
  },
  {
    label: 'Wrong sized image',
    src: 'https://media.istockphoto.com/vectors/missing-rubber-stamp-vector-vector-id1213374148',
    tags: ['tag1', 'tag2', 'tag3'],
  },
];

const breakPoints = [
  { maxWidth: 1400, cols: 11 },
  { maxWidth: 1300, cols: 10 },
  { maxWidth: 1200, cols: 9 },
  { maxWidth: 1100, cols: 8 },
  { maxWidth: 975, cols: 7 },
  { maxWidth: 875, cols: 6 },
  { maxWidth: 750, cols: 5 },
  { maxWidth: 650, cols: 4 },
  { maxWidth: 530, cols: 3 },
];

const Grid: NextPage = () => {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 'calc(100vh - 68px)',
      }}
    >
      <Box
        style={{
          background: theme.colors.dark[8],
          borderRadius: theme.radius.md,
          padding: theme.spacing.xl,
          marginTop: theme.spacing.xl,
          marginBottom: theme.spacing.xl,
        }}
      >
        <ScrollArea
          type="never"
          style={{
            height: 'calc(100vh - 164px)', // TODO: change this
          }}
        >
          <SimpleGrid cols={12} spacing="xs" breakpoints={breakPoints}>
            {data.map((item, index) => (
              <HoverTarget key={index} {...item} />
            ))}
          </SimpleGrid>
        </ScrollArea>
      </Box>
    </Box>
  );
};

export default Grid;
