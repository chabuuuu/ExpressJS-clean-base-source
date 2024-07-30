import { Expose } from "class-transformer";

export class CreateNewDogRequestDto {
    @Expose()
    name!: string;

    @Expose()
    breed!: string;
}