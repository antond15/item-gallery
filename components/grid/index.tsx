import type { NextPage } from 'next';
import { createContext, useEffect, useState } from 'react';
import { createStyles, ScrollArea, SimpleGrid, Title } from '@mantine/core';
import type { ITag, IGridProps } from '@interfaces';
import Item from '../item';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: 'calc(100vh - 60px)', // TODO: change this to be more responsive
  },
  container: {
    background: theme.colors.dark[8],
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,

    '@media (max-width: 390px)': {
      padding: theme.spacing.xs,
    },

    '@media (max-width: 350px)': {
      borderRadius: 0,
      marginTop: theme.spacing.xs,
      marginBottom: 0,
    },
  },
  scrollArea: {
    height: 'calc(100vh - 156px)',
  },
  noResultWrapper: {
    position: 'absolute',
    width: '100%',
  },
  noResultTitle: {
    userSelect: 'none',
    opacity: 0.3,
  },
}));

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

const Grid: NextPage<IGridProps> = (props) => {
  const { classes } = useStyles();
  const [items, setItems] = useState(props.items);

  // Search and filter items
  useEffect(() => {
    const result = props.items.filter((item) => item.label.toLowerCase().includes(props.query));
    setItems(result);
  }, [props.query, props.items]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <ScrollArea type="hover" scrollbarSize={5} offsetScrollbars className={classes.scrollArea}>
          <SimpleGrid cols={12} spacing="xs" breakpoints={breakPoints}>
            {(items.length > 0 && (
              <TagsContext.Provider value={props.tags}>
                {items.map((item, index) => (
                  <Item key={index} {...item} />
                ))}
              </TagsContext.Provider>
            )) || (
              <>
                <div style={{ width: '100px' }} />
                <div className={classes.noResultWrapper}>
                  <Title align="center" className={classes.noResultTitle}>
                    No results found&nbsp;🙁
                  </Title>
                </div>
              </>
            )}
          </SimpleGrid>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Grid;
