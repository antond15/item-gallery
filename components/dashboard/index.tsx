import type { NextPage } from 'next';
import { useState } from 'react';
import { createStyles, Accordion, Group, Badge } from '@mantine/core';
import { IRequest } from '../../interfaces';
import Form from './form';

const useStyles = createStyles((theme) => ({
  container: {
    background: theme.colors.dark[8],
    borderRadius: theme.radius.md,
    maxWidth: 900,
    padding: theme.spacing.xl,
    margin: 'auto',
    marginTop: theme.spacing.xl,
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
  }

  return (
    <div className={classes.container}>
      <Accordion>
        {requests.map((request, index) => (
          <Accordion.Item key={index} value={request.id.toString()}>
            <Accordion.Control>
              <Group>
                <Badge color="cyan">{request.id}</Badge>
                {request.label}
              </Group>
            </Accordion.Control>

            <Accordion.Panel>
              <Form {...request} removeRequest={removeRequest} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Dashboard;
