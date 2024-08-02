import { CreateNewDogRequestDto } from "@/dto/dog/CreateNewDogRequestDto";
import { CreateNewDogResponseDto } from "@/dto/dog/CreateNewDogResponseDto";
import { ErrorCode } from "@/enums/ErrorCode.enum";
import { createSuccessResponseSchema } from "@/utils/documentation/swagger/schema-mapping/base-schema/create-success-response.schema";
import { deleteSuccessResponseSchema } from "@/utils/documentation/swagger/schema-mapping/base-schema/delete-success-response.schema";
import { errorResponseSchema } from "@/utils/documentation/swagger/schema-mapping/base-schema/error-response.schema";
import { findManyPagingResponseSchema } from "@/utils/documentation/swagger/schema-mapping/base-schema/find-many-paging-response.schema";
import { findOneResponseSchema } from "@/utils/documentation/swagger/schema-mapping/base-schema/find-one-response.schema";
import { requestBodySchema } from "@/utils/documentation/swagger/schema-mapping/base-schema/request-body.schema";
import { updateSuccessResponseSchema } from "@/utils/documentation/swagger/schema-mapping/base-schema/update-success-response.schema";
import { swaggerSchemaGenerator } from "class-to-swagger-schema";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

/**
 ** Config base schema
 */
swaggerSchemaGenerator.setFindOneResponseSchema(findOneResponseSchema);
swaggerSchemaGenerator.setErrorResponseSchema(errorResponseSchema);
swaggerSchemaGenerator.setRequestBodySchema(requestBodySchema);
swaggerSchemaGenerator.setFindManyPagingResponseSchema(
  findManyPagingResponseSchema
);
swaggerSchemaGenerator.setFindManyPagingResponseSchema(
  findManyPagingResponseSchema
);
swaggerSchemaGenerator.setUpdateSuccessResponseSchema(
  updateSuccessResponseSchema
);
swaggerSchemaGenerator.setDeleteSuccessResponseSchema(
  deleteSuccessResponseSchema
);
swaggerSchemaGenerator.setCreateSuccessResponseSchema(
  createSuccessResponseSchema
);

/**
 ** Swagger schema mapping with application DTOs
 */
export const swaggerSchemaMapping = {
  /**
   ** POST /dog/create
   */
  CreateNewDogRequestDto: swaggerSchemaGenerator.generateRequestBody(
    CreateNewDogRequestDto
  ),
  CreateNewDogResponseDto: swaggerSchemaGenerator.generateCreateSuccessResponse(
    CreateNewDogResponseDto
  ),
  CreateNewDog_VALIDATION_ERROR: swaggerSchemaGenerator.generateErrorResponse(
    "Validation error",
    ErrorCode.VALIDATION_ERROR,
    StatusCodes.BAD_REQUEST,
    ReasonPhrases.BAD_REQUEST
  ),
};
