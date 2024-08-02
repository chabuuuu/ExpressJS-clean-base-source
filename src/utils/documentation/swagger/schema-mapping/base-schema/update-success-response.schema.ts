export const updateSuccessResponseSchema = {
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
      description: "Data response",
      properties: {
        message: {
          type: "string",
          description: "Message",
          example: "Updated successfully",
        },
      },
    },
  },
};
