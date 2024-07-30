import { PropertyDescription } from "@/decorators/PropertyDescription.decorator";
import { PropertyExample } from "@/decorators/PropertyExample.decorator";
import { RequestBodyDto } from "@/decorators/RequestBodyDto.decorator";
import { Expose } from "class-transformer";

@RequestBodyDto()
export class CreateNewDogRequestDto {
    @Expose()
    @PropertyDescription("Dog's name")
    @PropertyExample("Jerry")
    name!: string ;

    @Expose()
    @PropertyDescription("Dog's breed")
    @PropertyExample("Husky")
    breed!: string; 
}