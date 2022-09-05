import type { NextPage } from 'next';
import { useMantineTheme, Box, ScrollArea, SimpleGrid } from '@mantine/core';
import Item from './Item';

// Temporary dummy data
const data = [
  {
    label: 'Armor',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/armor.png',
  },
  {
    label: 'Bandage',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/bandage.png',
  },
  {
    label: 'Onion',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/onion.png',
  },
  {
    label: 'Paperbag with long name',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/paperbag.png',
  },
  {
    label: 'Bullet',
    src: 'https://raw.githubusercontent.com/antond15/items/main/public/images/ammo-9.png',
  },
  {
    label: 'Wrong sized image',
    src: 'https://media.istockphoto.com/vectors/missing-rubber-stamp-vector-vector-id1213374148',
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
              <Item key={index} {...item} />
            ))}
          </SimpleGrid>
        </ScrollArea>
      </Box>
    </Box>
  );
};

export default Grid;
