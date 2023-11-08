import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

import { EXCEPTIONS_MESSAGES } from "src/exceptions/custom-exception";


export class LoginUserDto {
    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('email') })
    @IsEmail({}, { message: EXCEPTIONS_MESSAGES.INVALID_EMAIL('email') })
    email: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('password') })
    @MinLength(8, { message: EXCEPTIONS_MESSAGES.MIN_LENGTH_MESSAGE('password', 8) })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('password') })
    password: string;
}