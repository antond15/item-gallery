import type { NextPage } from 'next';
import { createContext, useEffect, useState } from 'react';
import { useMantineTheme, Box, ScrollArea, SimpleGrid, Title } from '@mantine/core';
import ItemHover from './ItemHover';
import type { ITag, IGridProps } from '../../interfaces';

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

export const TagsContext = createContext<ITag[]>([]);

const Grid: NextPage<IGridProps> = (props: IGridProps) => {
  const theme = useMantineTheme();
  const [items, setItems] = useState(props.items);

  useEffect(() => {
    const result = props.items.filter((item) => item.label.toLowerCase().includes(props.query));
    setItems(result);
  }, [props.query, props.items]);

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: 'calc(100vh - 68px)', // TODO: change this to be responsive
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
            height: 'calc(100vh - 164px)', // TODO: change this to be responsive
          }}
        >
          <SimpleGrid cols={12} spacing="xs" breakpoints={breakPoints}>
            {(items.length > 0 && (
              <TagsContext.Provider value={props.tags}>
                {items.map((item, index) => (
                  <ItemHover key={index} {...item} />
                ))}
              </TagsContext.Provider>
            )) || (
              <>
                <Box style={{ width: '100px' }} />
                <Box
                  style={{
                    position: 'absolute',
                    width: '100%',
                  }}
                >
                  <Title
                    align="center"
                    style={{
                      userSelect: 'none',
                      opacity: 0.3,
                    }}
                  >
                    No results found&nbsp;🙁
                  </Title>
                </Box>
              </>
            )}
          </SimpleGrid>
        </ScrollArea>
      </Box>
    </Box>
  );
};

export default Grid;
