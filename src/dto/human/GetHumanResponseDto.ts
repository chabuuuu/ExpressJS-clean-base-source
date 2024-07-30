import { Expose } from "class-transformer";

export class GetHumanResponseDto {
    @Expose()
    id!: number;
    @Expose()
    name!: string;
    @Expose()
    role!: string;
    @Expose()
    username!: string;
}