import { Genre } from "../genre/genre";

export class Content{
    _id             ?: string   ;
    isFilm          !: boolean  ;
    title           !: string   ;
    trailer         !: string   ;
    image           !: string   ;
    releaseAt       !: Date     ;
    classification  !: number   ;
    description     !: string   ;
    duration        !: string   ;
    tags            !: string[] ;
    castList        !: string[] ;
    genreList       !: string[] | Genre[];
    isActive        ?: boolean  ;
}
