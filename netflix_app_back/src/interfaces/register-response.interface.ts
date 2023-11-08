import { User } from "src/modules/user/entities/user.entity";


export interface RegisterResponse {
    user: User;
    token: string;
}