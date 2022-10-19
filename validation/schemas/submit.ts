import ajv from '../instance';
import type { JSONSchemaType } from 'ajv';
import type { ISubmit } from '../../interfaces';

const schema: JSONSchemaType<ISubmit> = {
  type: 'object',
  properties: {
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
  required: ['name', 'label', 'image'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export default validate;
