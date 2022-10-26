import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { createStyles, ScrollArea, Accordion, Title } from '@mantine/core';
import { IRequest, ITagCache } from '@interfaces';
import AccordionItem from './AccordionItem';

const useStyles = createStyles((theme) => ({
  scrollArea: {
    height: 'calc(100vh - 156px)',
  },
  container: {
    background: theme.colors.dark[8],
    borderRadius: theme.radius.md,
    maxWidth: 900,
    padding: theme.spacing.xl,
    margin: 'auto',
    marginTop: theme.spacing.xl,

    '@media (max-width: 950px)': {
      margin: theme.spacing.xl,
    },

    '@media (max-width: 450px)': {
      borderRadius: 0,
      margin: 0,
      marginTop: theme.spacing.xs,
    },
  },
  form: {
    background: theme.colors.dark[7],
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
  },
  noRequests: {
    userSelect: 'none',
    opacity: 0.3,
  },
}));

type Props = {
  requests: IRequest[];
};

const Dashboard: NextPage<Props> = (props) => {
  const { classes } = useStyles();
  const [requests, setRequests] = useState(props.requests);

  const removeRequest = (id: number) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  const [tags, setTags] = useState<ITagCache[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('/api/user/tags');
      const data: ITagCache[] = await response.json();
      setTags(data);
    };

    fetchTags();
  }, []);

  return (
    <div className={classes.container}>
      {(requests.length > 0 && (
        <ScrollArea type="hover" scrollbarSize={5} offsetScrollbars className={classes.scrollArea}>
          <Accordion>
            {requests.map((request) => (
              <AccordionItem
                key={request.id}
                className={classes.form}
                cachedTags={tags}
                removeRequest={removeRequest}
                {...request}
              />
            ))}
          </Accordion>
        </ScrollArea>
      )) || (
        <Title align="center" className={classes.noRequests}>
          No available requests
        </Title>
      )}
    </div>
  );
};

export default Dashboard;
