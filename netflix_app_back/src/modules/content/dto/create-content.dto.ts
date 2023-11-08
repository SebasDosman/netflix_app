import { ArrayMinSize, IsBoolean, IsEmpty, IsISO8601, IsIn, IsNotEmpty, IsString, Length } from "class-validator";

import { EXCEPTIONS_MESSAGES } from "src/exceptions/custom-exception";


export class CreateContentDto {
    @IsEmpty({ message: EXCEPTIONS_MESSAGES.ID_NOT_NECESSARY })
    _id: string;

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('title') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('title') })
    title: string

    @IsEmpty({ message: EXCEPTIONS_MESSAGES.NOT_NECESSARY })
    isActive: boolean

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('isFilm') })
    @IsBoolean({ message: EXCEPTIONS_MESSAGES.INVALID_BOOLEAN('isFilm') })
    isFilm: boolean

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('trailer') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('trailer') })
    trailer: string

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('image') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('image') })
    image: string

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('releaseAt') })
    @IsISO8601({ strict: true  } ,{ message: EXCEPTIONS_MESSAGES.INVALID_DATE("releaseAt", "YYYY-MM-DD") })
    releaseAt: Date

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('classification') })
    @IsIn([0, 7, 10, 13, 16, 18], { message: EXCEPTIONS_MESSAGES.VALID_CLASSIFICATION_NUMBER })
    classification: number

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('description') })
    @IsString({ message: EXCEPTIONS_MESSAGES.INVALID_STRING('description') })
    @Length(1, 300, { message: EXCEPTIONS_MESSAGES.MAX_LENGTH_MESSAGE('description', 300) })
    description: string

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('duration') })
    @IsString({ message:  EXCEPTIONS_MESSAGES.INVALID_STRING('duration') })
    duration: string

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('tags') })
    @ArrayMinSize(1, { message: EXCEPTIONS_MESSAGES.MIN_ARRAY_ELEMENTS("tags", 1) })
    tags: string[]

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('castList') })
    @ArrayMinSize(1, { message: EXCEPTIONS_MESSAGES.MIN_ARRAY_ELEMENTS("castList", 1) })
    castList: string[]

    @IsNotEmpty({ message: EXCEPTIONS_MESSAGES.NO_EMPTY_FIELD('genreList') })
    @ArrayMinSize(1, { message: EXCEPTIONS_MESSAGES.MIN_ARRAY_ELEMENTS("genreList", 1) })
    genreList: string[]
}   
