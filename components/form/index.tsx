import type { NextPage } from 'next';
import { Stack, TextInput, Textarea, MultiSelect, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import ImageHint from './ImageHint';
import type { ISubmit } from '@interfaces';
import { images } from 'next.config';
import tags from '@data/tags.json';

type Props = {
  onSubmit: (body: ISubmit, clearForm: () => void) => void;
  initialValues?: ISubmit;
  footerComponent: React.ReactNode;
  className: string;
  hideInputDescription?: boolean;
};

const SubmitForm: NextPage<Props> = (props) => {
  const allowedDomains = images?.domains || [];

  const initialValues = props.initialValues ?? {
    name: '',
    label: '',
    description: '',
    image: '',
    tags: [],
    weight: undefined,
  };

  const form = useForm({
    initialValues: initialValues,
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
          const hostname = new URL(value).hostname;
          if (!allowedDomains.includes(hostname)) return 'Image must be hosted on a valid host';
        } catch (error) {
          return 'Image must be a valid URL';
        }
      },
    },
  });

  return (
    <form
      className={props.className}
      onSubmit={form.onSubmit((values) => props.onSubmit(values, form.reset))}
    >
      <Stack spacing="xs">
        <TextInput
          label="Name"
          placeholder="bandage"
          description={!props.hideInputDescription && 'Name of the item used in-game'}
          withAsterisk
          maxLength={25}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Label"
          placeholder="Bandage"
          description={!props.hideInputDescription && 'Label visible to players in the inventory'}
          withAsterisk
          maxLength={50}
          {...form.getInputProps('label')}
        />
        <Textarea
          label="Description"
          placeholder="Bandage is a piece of cloth used to bind or stitch wounds or injuries."
          description={!props.hideInputDescription && 'Brief and general description of the item'}
          maxLength={500}
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps('description')}
        />
        <TextInput
          label="Image URL"
          placeholder="https://i.imgur.com/QjH6wOP.png"
          description={!props.hideInputDescription && <ImageHint domains={allowedDomains} />}
          withAsterisk
          {...form.getInputProps('image')}
        />
        <MultiSelect
          label="Tags"
          placeholder="Select tags that suits this item"
          description={
            !props.hideInputDescription && 'Used to categorize items only in this gallery'
          }
          data={tags as any}
          searchable
          nothingFound="Nothing found"
          clearable
          clearButtonLabel="Clear selection"
          {...form.getInputProps('tags')}
        />
        <NumberInput
          label="Weight"
          placeholder="50"
          description={
            !props.hideInputDescription && 'Possible weight of one piece of the item (in grams)'
          }
          min={0}
          {...form.getInputProps('weight')}
        />

        {props.footerComponent}
      </Stack>
    </form>
  );
};

export default SubmitForm;
