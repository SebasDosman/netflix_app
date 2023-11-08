import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Content } from 'src/app/domain/models/content/content';

@Injectable({
  providedIn: 'root'
})
export class ModalPrincipalService {

  constructor() { }
  private router = inject(Router)
  private route  = inject( ActivatedRoute )

  public content = signal<Content | null >( null )

  openModal( content: Content ){
    
    this.content.set( content )
    const currentUrl = this.router.url
    const nuevaUrl = `${currentUrl}?content=${content._id}`
    window.scrollTo({top: 0, behavior: 'smooth'})
    this.router.navigateByUrl(nuevaUrl)
  }

  getContentModal(){
    return this.content()
  }

}
