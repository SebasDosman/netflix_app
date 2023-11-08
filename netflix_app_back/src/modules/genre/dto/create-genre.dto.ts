import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

import { EXCEPTIONS_MESSAGES } from "src/exceptions/custom-exception";


export class CreateGenreDto {
    @IsEmpty({ message: EXCEPTIONS_MESSAGES.ID_NOT_NECESSARY })
    _id: string;
    
    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('name') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('name') })
    name: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('description') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('description') })
    description: string;
}