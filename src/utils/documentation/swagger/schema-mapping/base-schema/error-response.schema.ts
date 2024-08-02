export const errorResponseSchema = {
  type: "object",
  properties: {
    httpStatus: {
      type: "integer",
      description: "HTTP status code",
      example: {
        /**
         ** Add this if you want to inject http status example here
         */
        injectHttpStatusExample: true,
      },
    },
    httpMessage: {
      type: "string",
      description: "HTTP status message",
      example: {
        /**
         ** Add this if you want to inject http message example here
         */
        injectHttpMessageExample: true,
      },
    },
    error: {
      type: "object",
      description: "Error response",
      properties: {
        /**
         ** Add this if you want to inject your class here
         */
        injectClassHere: true,
      },
    },
    data: {
      type: "object",
      description: "Data response",
      example: null,
    },
  },
};
