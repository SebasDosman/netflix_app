import { query } from '@angular/animations';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {  BehaviorSubject, Subject, Subscription,takeUntil } from 'rxjs';
import { Content } from 'src/app/domain/models/content/content';
import { GetContentUseCase } from 'src/app/domain/usecase/content/get-content-use-case';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private destroy$: Subject<void> = new Subject()
  private contentSubscription$: Subscription | undefined;

  private resultadosCompartidosSubject = new BehaviorSubject<Content | Content[] | null>(null)
  resultadosCompartidos$ = this.resultadosCompartidosSubject.asObservable()

  private router = inject(Router)
  private contentUseCase = inject( GetContentUseCase)

  private querySearch = ""

  // private searchQuery$: Subject<string> = new Subject()

  constructor() { }

  ngOnInit(): void {
  }

  searchByQuery( query: string ){

    this.querySearch = query

    if( this.querySearch ) sessionStorage.setItem("querySearch", JSON.stringify(this.querySearch.replace(/%20/g, ' ') ))
    
    // if( this.router.url.split("/")[2] === 'search'){
      
    if( this.querySearch !== "" ){
      this.router.navigate(['/principal/search/' + this.querySearch]) 
      this.getContentsWithQuery( this.querySearch )
    }
  }


  compareQueryFromInputWithRoute( query: string ): string{
    const currentQuery = this.router.url.split("/")[3]
  
    if( currentQuery !== "" || currentQuery !== query || query) {
      
      this.querySearch = currentQuery
      if( this.querySearch ) sessionStorage.setItem("querySearch", JSON.stringify( currentQuery.replace(/%20/g, ' ') )) 
    }

    console.log( this.querySearch )
    return this.querySearch
  }

  getQueryBySession(): string{

    if( !sessionStorage.getItem("querySearch") ) {
      return ""
    }
    return JSON.parse( sessionStorage.getItem("querySearch")! )
  }


  deleteQuerySession(){
    if( sessionStorage.getItem("querySearch")) sessionStorage.removeItem("querySearch")
  }
  
  
  getContentsWithQuery( query: string ){
    if( query === "" || !query ) return
    
    this.contentUseCase.findByQuery( query )?.subscribe({
      next: (data) =>{
        this.resultadosCompartidosSubject.next( data )
      },
      error: (err ) =>{
        console.log( "Error en searchService getContentsWithQuery -> " )
        console.log( err )
      }
    })
  }
}
