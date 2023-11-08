import { IsArray, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

import { EXCEPTIONS_MESSAGES } from "src/exceptions/custom-exception";
import { Content } from "src/modules/content/entities/content.entity";


export class RegisterUserDto {
    _id?: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('name') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('name') })
    @MaxLength(50, {message: EXCEPTIONS_MESSAGES.MAX_LENGTH_MESSAGE('name', 50) })
    name: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('imageUrl') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('imageUrl') })
    imageUrl: string;

    @IsArray()
    favoriteList: Content[];

    @IsArray()
    historyList: Content[];

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('email') })
    @IsEmail({}, { message: EXCEPTIONS_MESSAGES.INVALID_EMAIL('email') })
    email: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('password') })
    @MinLength(8, { message: EXCEPTIONS_MESSAGES.MIN_LENGTH_MESSAGE('password', 8) })
    password: string;
}
