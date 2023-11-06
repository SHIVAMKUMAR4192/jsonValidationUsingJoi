import { errorResponse, validateDateAgainstSchema } from '../validation/jsonSchemaValidation'; 

describe('Validation Service Tests', () => {
  it('should validate data against a valid schema', () => {
    const schema = {
      type: 'object',
      properties: {
        first_name: { type: 'string', minLength: 4, maxLength: 30 },
        last_name: { type: 'string', minLength: 4, maxLength: 30 },
        phNumber: { type: 'string', pattern: '^[0-9]+' },
      },
      required: ['first_name', 'last_name', 'phNumber'],
    };

    const data = {
      first_name: 'John',
      last_name: 'smith',
      phNumber: '12345',
    };

    const result = validateDateAgainstSchema(schema, data);
    expect(result).toBe(undefined);
  });

  it('should handle invalid data', () => {
    const schema = {
      type: 'object',
      properties: {
        first_name: { type: 'string', minLength: 4, maxLength: 30 },
        last_name: { type: 'string', minLength: 4, maxLength: 30 },
        phNumber: { type: 'string', pattern: '^[0-9]+' },
      },
      required: ['first_name', 'last_name', 'phNumber'],
    };

    const data = {
      first_name: 'John', 
      last_name: 'Doe',
    };

    let capturedError: any;
    try {
      validateDateAgainstSchema(schema, data);
    } catch (error) {
      capturedError = error;
    }

    expect(capturedError).toBeDefined();
    expect(capturedError.message).toEqual('[{"path":"","message":"must have required property \'phNumber\'"}]');  });
});
