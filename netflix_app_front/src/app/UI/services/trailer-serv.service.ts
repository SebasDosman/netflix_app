import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Content } from 'src/app/domain/models/content/content';

@Injectable({
  providedIn: 'root'
})
export class TrailerServService {

  private router  = inject( Router )
  currentRoute!: string;

  constructor(){

    this.router.events.subscribe( event=>{

      if( event instanceof NavigationEnd ){
        this.currentRoute = event.url
      }
    })   
  }

  playTrailer( content: Content ){
    
    this.router.navigate([ "/principal/trailer/" + content._id ] )
  }

  getTrailer(){
    const contents  = JSON.parse( sessionStorage.getItem("contentList")! )
    const n_el = this.currentRoute.split("/").length
    const id = this.currentRoute.split("/")[n_el - 1]
    
    const content = contents.filter( (cont: any) => cont._id === id )[0]
    return content
  }
}
