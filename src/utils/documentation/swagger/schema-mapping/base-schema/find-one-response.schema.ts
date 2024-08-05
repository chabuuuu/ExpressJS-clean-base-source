export const findOneResponseSchema = {
  type: 'object',
  properties: {
    httpStatus: {
      type: 'integer',
      description: 'HTTP status code',
      example: '200'
    },
    httpMessage: {
      type: 'string',
      description: 'HTTP status message',
      example: 'OK'
    },
    error: {
      type: 'object',
      description: 'Error response',
      example: null
    },
    data: {
      type: 'object',
      description: 'Data response',
      properties: {
        /**
         ** Add this if you want to inject your class here
         */
        injectClassHere: true
      }
    }
  }
};
