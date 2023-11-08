export const EXCEPTIONS_MESSAGES = {
    ID_NOT_NECESSARY: "The field id is not required",
    VALID_CLASSIFICATION_NUMBER: "The field classification must be one of the following numbers (0, 7, 10, 13, 16, 18)",
    VALID_DURATION: "The field duration must have a format hh:mm:ss if it is a movie, if it is a series it must have a valid number of chapters",
    NOT_NECESSARY: "The field isActive is not required",

    NO_EMPTY_FIELD(field: string) {
        return `The ${ field } field must not be empty`
    },
    INVALID_ID(id: string) {
        return `The ${ id } id is not valid`
    },
    INVALID_EMAIL(field: string) {
        return `The ${ field } must be a valid email`
    },
    INVALID_PASSWORD(field: string) {
        return `The ${ field } must be a valid password`
    },
    INVALID_DATE(field: string, format: string) {
        return `The ${ field } must have a format ${ format }`
    },
    INVALID_STRING(field: string) {
        return `The ${ field } must be a valid string`
    },
    INVALID_BOOLEAN(field: string) {
        return `The ${ field } must be a valid boolean`
    },
    MAX_LENGTH_MESSAGE(field: string, num: number) {
        return `The ${ field } must have a maximum of ${ num } characters`
    },
    MIN_LENGTH_MESSAGE(field: string, num: number) {
        return `The ${ field } must have a minimum of ${ num } characters`
    },
    MIN_ARRAY_ELEMENTS(field: string, num: number) {
        return `The ${ field } must have at least ${ num } elements`
    }
}

