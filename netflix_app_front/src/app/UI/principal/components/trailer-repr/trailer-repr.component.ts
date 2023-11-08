import { Component, ElementRef, ViewChild, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { TrailerServService } from 'src/app/UI/services/trailer-serv.service';
import { Content } from 'src/app/domain/models/content/content';

@Component({
  selector: 'app-trailer-repr',
  templateUrl: './trailer-repr.component.html',
  styleUrls: ['./trailer-repr.component.css']
})
export class TrailerReprComponent {
  
  @ViewChild('videoElement') videoElement!: ElementRef;

  private router = inject( Router )

  private trailerServ = inject( TrailerServService )
  public data!: Content

  public isPaused     = signal<boolean>(false)
  public isFullScreen = signal<boolean>(false)
  public showVolume   = signal<boolean>( false )
  public videoSeconds = signal<number>(0)
  public currentTime  = signal<number>(0)
  currentTimeVar      = this.currentTime()
  showControls        = signal<boolean>( true )
  
  public volumen: any = 0.5

  showControlsStartTimer(){
    console.log("Move")
    this.showControls.set( true )
  }

  hideControlsStartTimer(){

    setTimeout(()=>{
      this.showControls.set( false )
    }, 3000 )
  }

  ngOnInit(): void {
    
    this.data     = this.trailerServ.getTrailer()
    const video   = document.querySelector("video")
    this.pause("")  
  }

  setSeconds(){
    const video   = document.querySelector("video")
    this.videoSeconds.set( video!.duration )
  }

 

  onTimeUpdate( event: any ){
    const video   = document.querySelector("video")
    this.currentTime.set( video?.currentTime! )
    this.currentTimeVar = this.currentTime() 
  }

  timeChanged( event: any ){
    const video   = document.querySelector("video")

    this.currentTime.set( this.currentTimeVar )
    video!.currentTime = this.currentTimeVar
  }

  play( event: any ){

    this.isPaused.set( false )
    const video   = document.querySelector("video")
    video?.play()
  }

  pause( event: any ){
    this.isPaused.set( true )
    const video   = document.querySelector("video")
    video?.pause()
  }

  pauseRewind(){
    const video   = document.querySelector("video")
    this.isPaused.set(  !this.isPaused() )
    
    if( this.isPaused() ) video?.pause()
    else video?.play()
  }

  rewind( event: any ){
    const video   = document.querySelector("video")
    video!.currentTime = video!.currentTime - 10
  }

  pass( event: any ){
    const video   = document.querySelector("video")
    video!.currentTime = video!.currentTime + 10
  }

  fullScreen( event: any ){
    this.isFullScreen.set( true )

    const element = document.documentElement
    element.requestFullscreen()
  }

  fullScreenExit( event: any ){
    this.isFullScreen.set( false )
    const element = document.documentElement
    if( document.fullscreenElement ) document.exitFullscreen()
    element.requestFullscreen()
  }

  setVolume( volumen: any ){
    const video   = document.querySelector("video")
    video!.volume = volumen
  }

  showVolumeBar(){
    this.showVolume.set( true )
  }

  notShowVolumeBar(){
    this.showVolume.set( false )
  }

  getBack(){
    console.log("")
    this.router.navigateByUrl("/principal/")
  }
}

