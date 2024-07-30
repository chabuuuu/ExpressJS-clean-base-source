import { getPropertyDescription } from "@/decorators/PropertyDescription.decorator";
import { convertToDto } from "@/utils/dto-convert/convert-to-dto";
import BaseException from "@/utils/exception/BaseException";
import "reflect-metadata";

class SwaggerSchemaGenerator {
  private readonly requestBodySchema = {
    type: "object",
    properties: {},
  };

  private readonly findOneResponseSchema = {
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
        properties: {},
      },
    },
  };

  private readonly findManyResponseSchema = {
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
          properties: {},
        },
      },
    },
  };

  private readonly findPagingResponseSchema = {
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
              properties: {},
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

  private readonly createSuccessResponseSchema = {
    type: "object",
    properties: {
      httpStatus: {
        type: "integer",
        description: "HTTP status code",
        example: "201",
      },
      httpMessage: {
        type: "string",
        description: "HTTP status message",
        example: "Created",
      },
      error: {
        type: "object",
        description: "Error response",
        example: null,
      },
      data: {
        type: "object",
        description: "Data response",
        properties: {},
      },
    },
  };

  private readonly updateSuccessResponseSchema = {
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

  private readonly deleteSuccessResponseSchema = {
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
            example: "Deleted successfully",
          },
        },
      },
    },
  };

  private readonly errorResponseSchema = {
    type: "object",
    properties: {
      httpStatus: {
        type: "integer",
        description: "HTTP status code",
        example: "",
      },
      httpMessage: {
        type: "string",
        description: "HTTP status message",
        example: "",
      },
      error: {
        type: "object",
        description: "Error response",
        properties: {},
      },
      data: {
        type: "object",
        description: "Data response",
        example: null,
      },
    },
  };

  private convertDto(dtoClass: any): Record<any, any> {
    let properties: Record<any, any> = {};
    const instance = new dtoClass();
    const instanceKeys = Object.keys(
      convertToDto<typeof dtoClass>(dtoClass, {})
    );

    for (const key of instanceKeys) {
      const type = Reflect.getMetadata("design:type", instance, key);
      const description = getPropertyDescription(instance, key);
      const example = Reflect.getMetadata("example", instance, key);

      let typeString = "";

      switch (type) {
        case String:
          typeString = "string";
          break;
        case Number:
          typeString = "integer";
          break;
        case Boolean:
          typeString = "boolean";
          break;
        default:
          typeString = "object";
      }

      properties[key] = {
        type: typeString,
        description: description,
        example: example,
      };
    }

    return properties;
  }

  /**
   ** Get update success response schema
   */
  public getUpdateSuccessResponseSchema(): Record<any, any> {
    return this.updateSuccessResponseSchema;
  }

  /**
   ** Get delete success response schema
   */
  public getDeleteSuccessResponseSchema(): Record<any, any> {
    return this.deleteSuccessResponseSchema;
  }

  /**
   * Convert DTO to find paging response schema
   */
  public generateFindPagingResponse(dtoClass: any): Record<any, any> {
    const properties = this.convertDto(dtoClass);
    this.findPagingResponseSchema.properties.data.properties.items.items.properties =
      properties;
    return this.findPagingResponseSchema;
  }

  /**
   ** Convert DTO to find many response schema
   */
  public generateFindManyResponse(dtoClass: any): Record<any, any> {
    const properties = this.convertDto(dtoClass);
    this.findManyResponseSchema.properties.data.items.properties = properties;
    return this.findManyResponseSchema;
  }

  /**
   ** Convert DTO to request body schema
   * @param dtoClass
   * @returns
   */
  public generateRequestBody(dtoClass: any): Record<any, any> {
    const properties = this.convertDto(dtoClass);

    this.requestBodySchema.properties = properties;

    return this.requestBodySchema;
  }

  /**
   ** Convert DTO to find one response schema
   * @param dtoClass
   * @returns
   */

  /**
   ** Convert DTO to find one response schema
   * @param dtoClass
   * @returns
   */
  public generateFindOneResponse(dtoClass: any): Record<any, any> {
    const properties = this.convertDto(dtoClass);
    this.findOneResponseSchema.properties.data.properties = properties;
    return this.findOneResponseSchema;
  }

  /**
   ** Convert DTO to create success response schema
   * @param dtoClass
   * @returns
   */
  public generateCreateSuccessResponse(dtoClass: any): Record<any, any> {
    const properties = this.convertDto(dtoClass);
    this.createSuccessResponseSchema.properties.data.properties = properties;
    return this.createSuccessResponseSchema;
  }

  /**
   ** Convert DTO to error response schema
   * @param dtoClass
   * @returns
   */
  public generateErrorResponse(dtoClass: BaseException): Record<any, any> {
    const code = dtoClass.code;
    const message = dtoClass.message;
    const httpStatusCode = dtoClass.httpStatusCode;
    const httpStatusMessage = dtoClass.httpStatusMessage;
    this.errorResponseSchema.properties.httpStatus.example =
      httpStatusCode.toString();
    this.errorResponseSchema.properties.httpMessage.example = httpStatusMessage;
    this.errorResponseSchema.properties.error.properties = {
      code: {
        type: "string",
        description: "Error code",
        example: code,
      },
      message: {
        type: "string",
        description: "Error message",
        example: message,
      },
    };

    return this.errorResponseSchema;
  }
}

/**
 ** Swagger schema generator from DTO
 */
export const swaggerSchemaGenerator = new SwaggerSchemaGenerator();
