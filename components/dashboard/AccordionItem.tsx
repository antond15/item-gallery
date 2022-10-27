import type { NextPage } from 'next';
import { useState } from 'react';
import { Accordion, Group, Badge } from '@mantine/core';
import SubmitForm from '../form';
import FooterButtons from './FooterButtons';
import type { ISubmit, IRequest, ITagCache } from '@interfaces';

type Props = {
  className: string;
  removeRequest: (id: number) => void;
  cachedTags: ITagCache[];
} & IRequest;

const AccordionItem: NextPage<Props> = (props) => {
  const initialValues: ISubmit = {
    name: props.name,
    label: props.label,
    description: props.description,
    image: props.image,
    tags: props.tags,
    weight: props.weight,
  };

  const [formValues, setFormValues] = useState(initialValues);

  return (
    <Accordion.Item value={props.id.toString()}>
      <Accordion.Control>
        <Group>
          <Badge color="cyan">{props.id}</Badge>
          {formValues.label}
        </Group>
      </Accordion.Control>

      <Accordion.Panel>
        <SubmitForm
          className={props.className}
          hideInputDescription
          initialValues={initialValues}
          tags={props.cachedTags}
          onSubmit={(values) => setFormValues(values)}
          footerComponent={
            <FooterButtons
              values={{ ...formValues, id: props.id }}
              removeRequest={props.removeRequest}
            />
          }
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default AccordionItem;
