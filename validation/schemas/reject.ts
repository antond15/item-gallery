import ajv from '../instance';
import type { JSONSchemaType } from 'ajv';

interface Schema {
  id: number;
}

const schema: JSONSchemaType<Schema> = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      minimum: 1,
    },
  },
  required: ['id'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export default validate;
