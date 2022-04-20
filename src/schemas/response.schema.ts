import { getSchemaPath } from '@nestjs/swagger';

export const ResponseSchema = (dto: any = null) => ({
  properties: {
    status: { type: 'string' },
    code: { type: 'number' },
    error: { type: 'string' },
    messages: { type: 'string' },
    ...(dto ? { data: { $ref: getSchemaPath(dto) } } : {}),
  },
});
