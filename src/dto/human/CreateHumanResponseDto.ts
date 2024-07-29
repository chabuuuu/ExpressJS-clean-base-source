import { Expose } from "class-transformer";

export class CreateHumanResponseDto {
    @Expose()
    name!: string;
}