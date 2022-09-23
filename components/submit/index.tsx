import type { NextPage } from 'next';
import {
  createStyles,
  Stack,
  TextInput,
  Textarea,
  MultiSelect,
  Button,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { ISubmit } from '../../interfaces';

const useStyles = createStyles((theme) => ({
  form: {
    background: theme.colors.dark[8],
    borderRadius: theme.radius.md,
    maxWidth: 450,
    padding: theme.spacing.xl,
    margin: 'auto',
    marginTop: theme.spacing.xl,
  },
  buttonWrapper: {
    textAlign: 'right',
    marginTop: theme.spacing.xs,
  },
}));

// TODO: fetch from db
const tags = [
  { label: 'Food', value: 1 },
  { label: 'Drinks', value: 2 },
  { label: 'Consumables', value: 3 },
  { label: 'Furniture', value: 4 },
];

// TODO: move somewhere else
const allowedHosts = ['i.imgur.com', 'raw.githubusercontent.com'];

const submit = async (values: ISubmit, clearForm: () => void) => {
  // Show the notificaton before the request to visualize the loading state
  showNotification({
    id: 'submit',
    title: 'Submitting',
    message: 'Your submission is being processed.',
    loading: true,
    autoClose: false,
    disallowClose: true,
  });

  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (response.ok) {
    // Update and clear the form inputs
    updateNotification({
      id: 'submit',
      title: 'Successfully submitted',
      message: 'Your item submission has been successfully sent to the review team.',
      color: 'green',
      autoClose: 10000,
    });

    clearForm();
  } else {
    updateNotification({
      id: 'submit',
      title: 'Something bad happened',
      message: (
        <>
          Try again later or ask for help at our{' '}
          <Anchor href="https://discord.gg/2ZezMw2xvR" target="_blank">
            Discord
          </Anchor>{' '}
          server.
        </>
      ),
      color: 'red',
      autoClose: false,
    });
  }
};

const SubmitForm: NextPage = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      label: '',
      description: '',
      image: '',
      tags: [],
    },
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
          if (!allowedHosts.includes(hostname)) return 'Image must be hosted on a valid host';
        } catch (error) {
          return 'Image must be a valid URL';
        }
      },
    },
  });

  return (
    <form className={classes.form} onSubmit={form.onSubmit((values) => submit(values, form.reset))}>
      <Stack spacing="xs">
        <TextInput
          label="Label"
          placeholder="Bandage"
          withAsterisk
          maxLength={50}
          {...form.getInputProps('label')}
        />
        <Textarea
          label="Description"
          placeholder="Bandage is a piece of cloth used to bind or stitch wounds or injuries."
          maxLength={500}
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps('description')}
        />
        <TextInput
          label="Image URL"
          placeholder="https://i.imgur.com/QjH6wOP.png"
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

        <div className={classes.buttonWrapper}>
          <Button type="submit" variant="light" color="cyan" size="xs">
            Submit request
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default SubmitForm;
