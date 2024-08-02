import { SwaggerExample, SwaggerProperty } from "class-to-swagger-schema";
import { Expose } from "class-transformer";

export class CreateNewDogRequestDto {
  @Expose()
  @SwaggerProperty("Dog's name")
  @SwaggerExample("Jerry")
  name!: string;

  @Expose()
  @SwaggerProperty("Dog's breed")
  @SwaggerExample("Husky")
  breed!: string;
}
