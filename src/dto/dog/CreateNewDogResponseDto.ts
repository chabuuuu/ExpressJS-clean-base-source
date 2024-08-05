import { SwaggerExample, SwaggerProperty } from 'class-to-swagger-schema';
import { Expose } from 'class-transformer';

export class CreateNewDogResponseDto {
  @Expose()
  @SwaggerExample('1')
  @SwaggerProperty("Dog's id")
  id!: string;

  @Expose()
  @SwaggerExample('Jerry')
  @SwaggerProperty("Dog's name")
  name!: string;

  @Expose()
  @SwaggerExample('Husky')
  @SwaggerProperty("Dog's breed")
  breed!: string;

  @Expose()
  @SwaggerExample('true')
  @SwaggerProperty('The dog is good boy or not')
  isGoodBoy!: boolean;
}
