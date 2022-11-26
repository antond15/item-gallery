import type { NextPage } from 'next';
import { useState } from 'react';
import { createStyles, ScrollArea, Accordion, Title } from '@mantine/core';
import AccordionItem from './AccordionItem';
import type { IRequest } from '@interfaces';

const useStyles = createStyles((theme) => ({
  wrapper: {
    background: theme.colors.dark[8],
    borderRadius: theme.radius.md,
    maxWidth: 900,
    padding: theme.spacing.xl,
    margin: 'auto',
    marginTop: theme.spacing.xl,

    '@media (max-width: 950px)': {
      margin: theme.spacing.xl,
    },

    '@media (max-width: 600px)': {
      padding: theme.spacing.sm,
    },

    '@media (max-width: 450px)': {
      borderRadius: 0,
      margin: 0,
      marginTop: theme.spacing.xs,
      padding: theme.spacing.sm,
    },
  },
  container: {
    height: 'calc(100vh - 156px)',
  },
  form: {
    background: theme.colors.dark[7],
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
  },
  accordionContent: {
    padding: 0,
    paddingTop: '5px',
    paddingBottom: theme.spacing.sm,
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

  return (
    <div className={classes.wrapper}>
      {(requests.length > 0 && (
        <ScrollArea type="hover" scrollbarSize={5} className={classes.container}>
          <Accordion
            classNames={{
              content: classes.accordionContent,
            }}
          >
            {requests.map((request) => (
              <AccordionItem
                key={request.id}
                className={classes.form}
                removeRequest={removeRequest}
                {...request}
              />
            ))}
          </Accordion>
        </ScrollArea>
      )) || (
        <Title align="center" className={classes.container}>
          No available requests
        </Title>
      )}
    </div>
  );
};

export default Dashboard;
