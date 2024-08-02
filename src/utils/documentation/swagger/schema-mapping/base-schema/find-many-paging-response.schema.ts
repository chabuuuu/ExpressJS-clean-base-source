export const findManyPagingResponseSchema = {
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
      type: "object",
      description: "Paging response",
      properties: {
        records: {
          type: "integer",
          description: "Total records",
          example: 20,
        },
        items: {
          type: "array",
          description: "Item response",
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
        pages: {
          type: "integer",
          description: "Total pages",
          example: 2,
        },
        page: {
          type: "integer",
          description: "Current page",
          example: 1,
        },
        recordFrom: {
          type: "integer",
          description: "Record from",
          example: 1,
        },
        recordTo: {
          type: "integer",
          description: "Record to",
          example: 10,
        },
      },
    },
  },
};
