import { Content } from "../content/content";

export class User{
    _id         ?: string   ;
    name        !: string   ;
    email       !: string   ;
    password    ?: string   ;
    createdAt   ?: Date     ;
    imageUrl    !: string   ;
    favoriteList?: string[] | Content[];
    roles       ?: string[] ;
    historyList ?: string[] | Content[];
}