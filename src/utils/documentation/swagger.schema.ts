import { CreateNewDogRequestDto } from "@/dto/dog/CreateNewDogRequestDto";
import { CreateNewDogResponseDto } from "@/dto/dog/CreateNewDogResponseDto";
import { generateRequestSchema, generateResponseSchema } from "@/utils/dto-convert/convert-dto-to-schema";

export const swaggerSchema = {
    CreateNewDogRequestDto: generateRequestSchema(CreateNewDogRequestDto),
    CreateNewDogResponseDto: generateResponseSchema(CreateNewDogResponseDto),
}