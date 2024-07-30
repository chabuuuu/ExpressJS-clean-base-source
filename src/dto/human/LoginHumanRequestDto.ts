import { Expose } from "class-transformer";

export class LoginHumanRequestDto {
    @Expose()
    username!: string;

    @Expose()
    password!: string;
}