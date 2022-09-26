import type { NextPage } from 'next';
import { useState } from 'react';
import {
  createStyles,
  Stack,
  Group,
  TextInput,
  Textarea,
  MultiSelect,
  Button,
  ActionIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { IRequest } from '../../interfaces';
import { images } from '../../next.config';

const useStyles = createStyles((theme) => ({
  form: {
    background: theme.colors.dark[7],
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
  },
}));

// TODO: fetch from db
const tags = [
  { label: 'Food', value: 1 },
  { label: 'Drinks', value: 2 },
  { label: 'Consumables', value: 3 },
  { label: 'Furniture', value: 4 },
];

type Props = {
  removeRequest: (id: number) => void;
} & IRequest;

const Form: NextPage<Props> = (props) => {
  const { classes } = useStyles();

  const initialValues = {
    label: props.label,
    description: props.description,
    image: props.image,
    tags: props.tags,
  };

  const [values, setValues] = useState(initialValues);

  const form = useForm({
    initialValues: initialValues,
    // Validate basic stuff like 'required' or 'min length' this way because of the UI
    validate: {
      label: (value) => {
        if (!value) return 'Label is required';
        if (value.length < 2) return 'Label must be at least 2 characters long';
      },
      image: (value) => {
        if (!value) return 'Image is required';

        try {
          // Regex would be more performant but in this case it's ok
          const hostname = new URL(value).hostname;
          if (!images?.domains?.includes(hostname)) return 'Image must be hosted on a valid host';
        } catch (error) {
          return 'Image must be a valid URL';
        }
      },
    },
  });

  return (
    <form className={classes.form} onSubmit={form.onSubmit(setValues)}>
      <Stack spacing="xs">
        <TextInput
          label="Label"
          placeholder="Label"
          withAsterisk
          maxLength={50}
          {...form.getInputProps('label')}
        />
        <Textarea
          label="Description"
          placeholder="Description"
          maxLength={500}
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps('description')}
        />
        <TextInput
          label="Image URL"
          placeholder="Image URL"
          withAsterisk
          {...form.getInputProps('image')}
        />
        <MultiSelect
          label="Tags"
          placeholder="Select tags that suits this item"
          data={tags}
          searchable
          nothingFound="Nothing found"
          clearable
          clearButtonLabel="Clear selection"
          {...form.getInputProps('tags')}
        />

        <Group position="apart">
          <Group spacing="xs">
            <ActionIcon
              color="green"
              variant="light"
              onClick={() => {
                fetch('/api/request/accept', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    id: props.id,
                    label: values.label,
                    description: values.description,
                    image: values.image,
                    tags: values.tags,
                  }),
                });

                props.removeRequest(props.id);
              }}
            >
              <FaCheck />
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => {
                fetch('/api/request/reject', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: props.id }),
                });

                props.removeRequest(props.id);
              }}
            >
              <FaTimes />
            </ActionIcon>
          </Group>
          <Button type="submit" variant="light" color="cyan" size="xs">
            Apply changes
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default Form;
