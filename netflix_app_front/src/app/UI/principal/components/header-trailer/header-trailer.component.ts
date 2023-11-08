import { Component, Input, inject, signal, effect } from '@angular/core';
import { Content } from 'src/app/domain/models/content/content';
import { Location } from '@angular/common';
import { TrailerServService } from 'src/app/UI/services/trailer-serv.service';
import { ModalPrincipalService } from 'src/app/UI/services/modal-principal.service';
import { StorageService } from 'src/app/UI/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-trailer',
  templateUrl: './header-trailer.component.html',
  styleUrls: ['./header-trailer.component.css']
})
export class HeaderTrailerComponent {

  @Input() contents !: Content[];
  private location = inject( Location )
  private trailerServ = inject( TrailerServService )
  private modalServ   = inject( ModalPrincipalService )
  private storageServ = inject( StorageService)

  public  randomData    = signal<Content | null>(null)
  private numTrailer    = signal<number>(0)
  public  volumeOn      = signal<boolean>( true )

  ngOnInit(): void {

    const video   = document.querySelector("video")
    video!.muted = true

    const isPlaying = video!.currentTime > 0 && !video!.paused && !video!.ended 
    && video!.readyState > video!.HAVE_CURRENT_DATA;

    video!.muted = true
    if(!isPlaying){

      video?.play()
    }


    this.pauseInFirstFotogram( )
    this.chargeDataInSessionStorage()
    this.randomInfoLoad()
  }

  pauseInFirstFotogram( ){
    const video   = document.querySelector("video")
    setTimeout( () =>{
      video?.pause()
      
    }, 200)
  }

  chargeDataInSessionStorage(){
    const url = this.location.path().split("/")[2]
    const urlSession = "trailerNum" + url
    
    let num =  JSON.parse( sessionStorage.getItem( urlSession )! )
   
    if( !(typeof num == "number")  ){
      const value = JSON.stringify(Math.floor( Math.random() * this.contents.length ))
      sessionStorage.setItem( urlSession, value! )

      num = JSON.parse( sessionStorage.getItem( urlSession )!)
    } 
      this.numTrailer.set( +num )
  }

  randomInfoLoad(){
  
    if( !this.contents ){
      
      this.randomData.set( null )
      return
    }
    this.randomData.set( this.contents[this.numTrailer()] ) 
    
  }

  onMouseEnter( event: any ){
    
    const video   = document.querySelector("video")
    video?.play()
  }


  trailerSound = effect(() =>{
    const video = document.querySelector("video")
    video!.muted = this.volumeOn()
  })

  play(){
      this.storageServ.addToHistory( this.randomData()! )
      this.trailerServ.playTrailer( this.randomData()! )
  }


  openInfo(){
    this.modalServ.openModal( this.randomData()! )
  }
}
