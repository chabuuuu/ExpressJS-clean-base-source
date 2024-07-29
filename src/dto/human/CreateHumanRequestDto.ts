import { Expose } from "class-transformer";

export class CreateHumanRequestDto {
    @Expose()
    name!: string;
}