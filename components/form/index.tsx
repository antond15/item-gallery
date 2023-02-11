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
        if (!value) return 'Jméno je povinné';
        if (value.length < 2) return 'Jméno musí být minimálně 2 znaky dlouhé';
      },
      label: (value) => {
        if (!value) return 'Název je povinný';
        if (value.length < 2) return 'Název musí být minimálně 2 znaky dlouhý';
      },
      image: (value) => {
        if (!value) return 'Obrázek je povinný';

        try {
          const hostname = new URL(value).hostname;
          if (!allowedDomains.includes(hostname))
            return 'Obrázek musí být umístěn na povolené doméně';
        } catch (error) {
          return 'Obrázek musí mít platnou URL adresu';
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
          label="Jméno"
          placeholder="obvaz"
          description={!props.hideInputDescription && 'Jméno předmětu ve hře'}
          withAsterisk
          maxLength={25}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Název"
          placeholder="Obvaz"
          description={
            !props.hideInputDescription && 'Název předmětu viditelný v hráčském inventáři'
          }
          withAsterisk
          maxLength={50}
          {...form.getInputProps('label')}
        />
        <Textarea
          label="Popisek"
          placeholder="Obvaz je kus látky, který se používá k obvázání ran nebo zranění."
          description={!props.hideInputDescription && 'Stručný a obecný popis předmětu'}
          maxLength={500}
          autosize
          minRows={2}
          maxRows={4}
          {...form.getInputProps('description')}
        />
        <TextInput
          label="URL obrázku"
          placeholder="https://i.imgur.com/QjH6wOP.png"
          description={!props.hideInputDescription && <ImageHint domains={allowedDomains} />}
          withAsterisk
          {...form.getInputProps('image')}
        />
        <MultiSelect
          label="Štítky"
          placeholder="Vyberte štítky, které se hodí k tomuto předmětu"
          description={
            !props.hideInputDescription && 'Slouží ke kategorizaci předmětů v této galerii'
          }
          data={tags as any}
          searchable
          nothingFound="Nic nenalezeno"
          clearable
          clearButtonLabel="Clear selection"
          {...form.getInputProps('tags')}
        />
        <NumberInput
          label="Hmotnost"
          placeholder="50"
          description={
            !props.hideInputDescription && 'Přibližná hmotnost jednoho kusu předmětu (v gramech)'
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
