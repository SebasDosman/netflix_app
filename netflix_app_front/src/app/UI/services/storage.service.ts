import { Injectable,  effect, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Content } from 'src/app/domain/models/content/content';
import { Genre } from 'src/app/domain/models/genre/genre';
import { User } from 'src/app/domain/models/user/user';
import { ManageJWTLocal } from 'src/app/domain/usecase/JWT/manage-jwt-local-use-case';
import { JwtUseCase } from 'src/app/domain/usecase/auth/jwt-auth-use-case';
import { GetContentUseCase } from 'src/app/domain/usecase/content/get-content-use-case';
import { GetGenreUseCase } from 'src/app/domain/usecase/genre/get-genre-use-case';
import { ModifyUserUseCase } from '../../domain/usecase/user/modify-user-use-case';
import { ModifyContentUseCase } from 'src/app/domain/usecase/content/modify-content-use-case';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _getContentUseCase = inject( GetContentUseCase  )
  private _getGenreUseCase   = inject( GetGenreUseCase    )
  
  private modifyContent     = inject( ModifyContentUseCase )
  private modifyUser = inject( ModifyUserUseCase )

  private _jwtUseCase       = inject(  JwtUseCase )
  private _jwtLocalUseCase  = inject( ManageJWTLocal )



  private usersFromDb   = signal<any | User   >  ( null )
  private contentFromDb = signal<any | Content[]>( null )
  private genreFromDb   = signal<any | Genre[]  >( null )

  private loadedData = new BehaviorSubject<boolean>( false )

  getLoadedData() {
    return this.loadedData.asObservable();
  }

  updateLoadedData( value: boolean ) {
    this.loadedData.next( value )
  }


  deleteAllSessionStorage(){

    const sessionLists = [ "genreList", "contentList", "user"]
    sessionLists.forEach( title => {

      if( sessionStorage.getItem( title ) ) sessionStorage.removeItem( title )
    })

    sessionStorage.getItem("token") && sessionStorage.removeItem("token")
  }

  getUserFromDB(){
    this._jwtUseCase.checkToken()?.subscribe({
      next: data =>{

          const { user, token } = data

          //Update the old token to the new and returns the user

          const tokenLocal = JSON.parse( localStorage.getItem("token")! )
          tokenLocal ? this._jwtLocalUseCase.saveTokenFromLocal( token ) : this._jwtLocalUseCase.saveTokenFromSesion( token )

          this.usersFromDb.set( user )
      },
      error: error =>{
        console.log( "Error getUSerFromDb principal app-component ", error )
      }
    })
  }

  getContentsFromDb(){
    this._getContentUseCase.getAllContent()?.subscribe( {
      next: content =>{
        this.contentFromDb.set( content )
      },
      error: error =>{
        console.log( "Error getContentsFromDb principal app-component ", error )
      }
    })
  }

  getGenreFromDb(){
    this._getGenreUseCase.getAllGenre().subscribe({
      next: genres =>{
        this.genreFromDb.set( genres )
      },
      error: error =>{
        console.log( "Error getGenreFromDb principal app-component ", error )
      }
    })
  }

  //When the users and content are loaded, we filter with fullUsers and fullContent to get the lists ready and then added to the sessionStorage
  waitDataAndExecute = effect( () => {

    if( this.usersFromDb() && this.contentFromDb() && this.genreFromDb() ){

      const fullUser   = this.fullUsers( this.usersFromDb(), this.contentFromDb())
      const fullConten = this.fullContent( this.contentFromDb(), this.genreFromDb() )

      this.addToSessionStorage( fullUser,  fullConten )
    }
  })


  addToSessionStorage( user: User, content: Content[] ){

    if( user && content ){

      sessionStorage.setItem("contentList", JSON.stringify( content ) )
      sessionStorage.setItem("user", JSON.stringify( user ))
      this.updateLoadedData( true )

    } else{
      console.log("Calling again storage.service")
      this.setContentFullToStorage()
    }
  }


  fullUsers( user: User, contents: Content[] ){
    const favorites: Content[] = []
    const historial: Content[] = []

    user.favoriteList!.forEach( id_favorite =>{
    //In all the users favorites, we search all the contents that matches with that id, the same with historial

      const cont = contents.find( cont => cont._id === id_favorite )

      if (cont !== undefined) {
        favorites.push(cont);
      }
    })

    user.historyList!.forEach( id_history =>{
      const cont = contents.find( cont => cont._id === id_history)

      if( cont !== undefined){
        historial.push( cont )
      }
    })

    user.favoriteList = favorites
    user.historyList  = historial

    return user
  }

  fullContent( contents: Content[], genres: Genre[] ){
    let genreList: Genre[] = []

    contents.map( content => {

      genreList = []
      content.genreList.forEach( genre_id =>{

        const genre = genres.find( gen => gen._id === genre_id )
        if( genre !== undefined ){
          genreList.push( genre )
        }
      })
      content.genreList = genreList
      return content
    })

    return contents
  }

  setContentFullToStorage(){
    this.getUserFromDB()
    this.getContentsFromDb()
    this.getGenreFromDb()
  }


  updateFavoriteToUserList( content: Content ): boolean{

    const usuarioSes = JSON.parse( sessionStorage.getItem("user")! )


    if( !usuarioSes ){
      console.log("Error: User not found in storage")
      return false
    }

    if( this.validateIfExistFavorite( content._id! )) {
      this.deleteFavorite( content._id!, usuarioSes  )
      return true
    }

    this.addFavorite( content, usuarioSes, usuarioSes._id )
    return true
  }


  addToHistory(  content: Content ){

    const usuarioSes = JSON.parse( sessionStorage.getItem("user")! )


    if( !usuarioSes ){
      console.log("Error: User not found in storage")
      return false
    }

    if( this.validateIfExistHistory( content._id! )) {
      return false
    }

    this.addHistory( content, usuarioSes, usuarioSes._id )
    return true
  }

  addHistory( content: Content, user: any, _id: string){
    const user_send = {...user}
    user_send.historyList.push( content )
    this.updateInDbAndSessionUser( _id, user_send )
  }

  deleteFavorite( _id: string, user:any ){
    const user_send = {...user}
    const favoritoSinObjeto = user.favoriteList.filter( (cont: any) => cont._id !== _id)

    user_send.favoriteList = favoritoSinObjeto


    this.updateInDbAndSessionUser( user_send._id, user_send)
  }

  addFavorite( content: Content, user: any, _id: string ) {

    const user_send = user
    user_send.favoriteList.push( content )
    this.updateInDbAndSessionUser( _id, user_send )
  }

  updateInDbAndSessionUser( _id: string, user: any ){

    const userAnt = {...user}
    const userMod = {...userAnt}

    delete userMod._id
    delete userMod.isActive
    delete userMod.__v
    delete userMod.roles
    delete userMod.createdAt

    userMod.favoriteList = this.getListOfIds( user.favoriteList )
    userMod.historyList  = this.getListOfIds( user.historyList )

    this.modifyUser.updateUser(  _id, userMod )?.subscribe({
      next: data =>{
        sessionStorage.setItem("user", JSON.stringify( userAnt ))
      },
      error: error =>{
        console.log( error )
      }
    })
  }

  getListOfIds( contentList: any ){
    return contentList.map( (cont:any) => cont._id )
  }

  validateIfExistHistory( _id: string ): boolean{
    const user: any = JSON.parse( sessionStorage.getItem("user")! )

    if( !user ){
      console.log("Error: User not found")
      return false
    }

    const historyFound = user.historyList.find( (_element: Content) => _element._id === _id  )

    if( historyFound ) return true
    return false
  }

  validateIfExistFavorite( _id: string  ): boolean{

    const user: any = JSON.parse( sessionStorage.getItem("user")! )

    if( !user ){
      console.log("Error: User not found")
      return false
    }

    const favoriteFound = user.favoriteList.find( (_element: Content) => _element._id === _id  )

    if( favoriteFound ) return true
    return false
  }

}
