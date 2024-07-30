import { PropertyDescription } from "@/decorators/PropertyDescription.decorator";
import { PropertyExample } from "@/decorators/PropertyExample.decorator";
import { Expose } from "class-transformer";

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