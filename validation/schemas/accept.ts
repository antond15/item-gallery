import ajv from '../instance';
import type { JSONSchemaType } from 'ajv';

interface Schema {
  id: number;
  name: string;
  label: string;
  description?: string;
  image: string;
  tags?: number[];
  weight?: number;
}

const schema: JSONSchemaType<Schema> = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      minimum: 1,
    },
    name: {
      type: 'string',
      minLength: 2,
    },
    label: {
      type: 'string',
      minLength: 2,
    },
    description: {
      type: 'string',
      nullable: true,
    },
    image: { type: 'string' },
    tags: {
      type: 'array',
      items: { type: 'number' },
      nullable: true,
    },
    weight: {
      type: 'number',
      minimum: 0,
      nullable: true,
    },
  },
  required: ['id', 'name', 'label', 'image'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export default validate;
