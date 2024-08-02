export const findManyResponseSchema = {
  type: "object",
  properties: {
    httpStatus: {
      type: "integer",
      description: "HTTP status code",
      example: "200",
    },
    httpMessage: {
      type: "string",
      description: "HTTP status message",
      example: "OK",
    },
    error: {
      type: "object",
      description: "Error response",
      example: null,
    },
    data: {
      type: "array",
      description: "Data response",
      items: {
        type: "object",
        properties: {
          /**
           ** Add this if you want to inject your class here
           */
          injectClassHere: true,
        },
      },
    },
  },
};
