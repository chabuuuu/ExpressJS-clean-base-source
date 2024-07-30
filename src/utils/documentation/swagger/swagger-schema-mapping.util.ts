import { CreateNewDogRequestDto } from "@/dto/dog/CreateNewDogRequestDto";
import { CreateNewDogResponseDto } from "@/dto/dog/CreateNewDogResponseDto";
import { ErrorCode } from "@/enums/ErrorCode.enum";
import { swaggerSchemaGenerator } from "@/utils/documentation/swagger/generate-swagger-schema.util";
import BaseException from "@/utils/exception/BaseException";

/**
 ** Swagger schema mapping with application DTOs 
 */
export const swaggerSchemaMapping = {

/**
 ** POST /dog/create 
 */
  CreateNewDogRequestDto: swaggerSchemaGenerator.generateRequestBody(CreateNewDogRequestDto),
  CreateNewDogResponseDto: swaggerSchemaGenerator.generateCreateSuccessResponse(CreateNewDogResponseDto),
  CreateNewDog_VALIDATION_ERROR: swaggerSchemaGenerator.generateErrorResponse(
    new BaseException(ErrorCode.VALIDATION_ERROR, "Validation error", 400)
  ),
};
