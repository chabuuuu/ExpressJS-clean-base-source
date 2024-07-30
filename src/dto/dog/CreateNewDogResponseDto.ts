import { Expose } from "class-transformer";

export class CreateNewDogResponseDto {
    @Expose()
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    breed!: string;

    @Expose()
    isGoodBoy!: boolean;
}