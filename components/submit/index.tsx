import type { NextPage } from 'next';
import {
  createStyles,
  Stack,
  TextInput,
  Textarea,
  MultiSelect,
  NumberInput,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import ImageHint from './ImageHint';
import { submit } from '@utils/submitHandler';
import { images } from '../../next.config';

const useStyles = createStyles((theme) => ({
  form: {
    background: theme.colors.dark[8],
    borderRadius: theme.radius.md,
    maxWidth: 450,
    padding: theme.spacing.xl,
    margin: 'auto',
    marginTop: theme.spacing.xl,

    '@media (max-width: 450px)': {
      borderRadius: 0,
      marginTop: theme.spacing.xs,
    },
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

const SubmitForm: NextPage = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      name: '',
      label: '',
      description: '',
      image: '',
      tags: [] as number[],
      weight: undefined,
    },
    // Validate basic stuff like 'required' or 'min length' this way because of the UI
    validate: {
      name: (value) => {
        if (!value) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters long';
      },
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
    <form className={classes.form} onSubmit={form.onSubmit((values) => submit(values, form.reset))}>
      <Stack spacing="xs">
        <TextInput
          label="Name"
          placeholder="bandage"
          description="Name of the item used in-game"
          withAsterisk
          maxLength={25}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Label"
          placeholder="Bandage"
          description="Label visible to players in the inventory"
          withAsterisk
          maxLength={50}
          {...form.getInputProps('label')}
        />
        <Textarea
          label="Description"
          placeholder="Bandage is a piece of cloth used to bind or stitch wounds or injuries."
          description="Brief and general description of the item"
          maxLength={500}
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps('description')}
        />
        <TextInput
          label="Image URL"
          placeholder="https://i.imgur.com/QjH6wOP.png"
          description={<ImageHint />}
          withAsterisk
          {...form.getInputProps('image')}
        />
        <MultiSelect
          label="Tags"
          placeholder="Select tags that suits this item"
          description="Used to categorize items only in this gallery"
          data={tags}
          searchable
          nothingFound="Nothing found"
          clearable
          clearButtonLabel="Clear selection"
          {...form.getInputProps('tags')}
        />
        <NumberInput
          label="Weight"
          placeholder="50"
          description="Possible weight of one piece of the item (in grams)"
          min={0}
          {...form.getInputProps('weight')}
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
