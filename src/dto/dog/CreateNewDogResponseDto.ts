import { PropertyDescription } from "@/decorators/PropertyDescription.decorator";
import { PropertyExample } from "@/decorators/PropertyExample.decorator";
import { Expose } from "class-transformer";

export class CreateNewDogResponseDto {
  @Expose()
  @PropertyExample("1")
  @PropertyDescription("Dog's id")
  id!: string;

  @Expose()
  @PropertyExample("Jerry")
  @PropertyDescription("Dog's name")
  name!: string;

  @Expose()
  @PropertyExample("Husky")
  @PropertyDescription("Dog's breed")
  breed!: string;

  @Expose()
  @PropertyExample("true")
  @PropertyDescription("The dog is good boy or not")
  isGoodBoy!: boolean;
}
