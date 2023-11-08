export class Register{
    _id         ?: string   ;
    name        !: string   ;
    email       !: string   ;
    password    !: string   ;
    createdAt   ?: Date     ;
    imageUrl    !: string   ;
    favoriteList?: string[] ;
    roles       ?: string[] ;
    historyList ?: string[] ;
}

export class Login{
    email       !: string   ;
    password    !: string   ;
}

export class JwtPayLoad{
    token !: string;
}