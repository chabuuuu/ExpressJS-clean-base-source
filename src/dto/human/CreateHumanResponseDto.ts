import { Expose } from "class-transformer";

export class CreateHumanResponseDto {

    @Expose()
    id!: string;

    @Expose()
    role!: string;

    @Expose()
    name!: string;

    @Expose()
    username!: string;
}