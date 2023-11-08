import { Observable }   from "rxjs"     ;
import { Content } from '../content';


export abstract class ContentGateway{
    abstract getById(_id: string )                          : Observable<Content>               | null
    abstract getAll ()                                      : Observable<Content[]>             | null
    abstract postContent( content: Content )                : Observable<Content>               | null
    abstract updateContent( _id: string, content: Content ) : Observable<any>                   | null
    abstract deleteContent( _id: string )                   : Observable<any>                   | null
    abstract findByQuery( query: string )                   :Observable<Content[] | Content>    | null
}