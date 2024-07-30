import { Expose } from "class-transformer";

export class LoginHumanResponseDto {

    @Expose()
    human!: {
        id: string;
        role: string;
        name: string;
        username: string;
    };

    @Expose()
    token!: string;
    
}