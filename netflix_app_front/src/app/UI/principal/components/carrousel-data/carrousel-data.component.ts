import { Component, ElementRef, HostListener, Input, ViewChild, signal, computed, inject } from '@angular/core';
import { Content } from 'src/app/domain/models/content/content';
import { LoginComponent } from '../../../auth/login/login.component';

@Component({
  selector: 'app-carrousel-data',
  templateUrl: './carrousel-data.component.html',
  styleUrls: ['./carrousel-data.component.css']
})
export class CarrouselDataComponent {
  @Input() content  !: Content[] | null;

  subcontent        !: Content[] | null | undefined
  windowWidth       !: number;
  n_elements_initial  = signal<number>(5)
  n_elements          = signal<number>(5)
  gridTemplateColumns = computed<string>(() => `repeat(${this.n_elements()}, minmax(215px, 1fr))`)
  n_conjuntos = signal<number>(0)
  position = signal<number>(0)

  mover_derecha = signal<boolean>( true )

  ngOnInit(): void {

    this.windowWidth = window.innerWidth
    this.position.set( 0 )
    this.onResize(null)
    this.move(0)
    this.n_elements_initial.set( this.n_conjuntos() )
  };

  move( direction: number ){

    if( this.position() <= 0 && direction === -1 ) return
    //If we have 15 contents, so we have three divisions of contents ( division 0, division 1, division 2 )
    this.n_conjuntos.set( Math.floor( ( this.content?.length! / this.n_elements() ) - 1 ) )
    if( this.position() > this.n_conjuntos() && direction === +1) return 
    
    this.position.update( pos => pos += direction )

    const newSubArr = this.content?.slice( (this.position() * this.n_elements()), (this.position() * this.n_elements()) + this.n_elements() )   
    if( newSubArr?.length === 0  ) return
    this.subcontent = newSubArr
    direction == 1 ? this.mover_derecha.set( true ) : this.mover_derecha.set( false )
  }

  @HostListener('window:resize', ['$event'])
  onResize( event: Event | null): void{
    
    this.windowWidth = window.innerWidth
    this.n_elements.set( Math.floor( ( this.windowWidth / 215 ) - ( 0.03*2 ) ) )
    this.move(0)
  }

}