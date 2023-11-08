import { User } from "src/modules/user/entities/user.entity";


export interface LoginResponse {
    user: User;
    token: string;
}