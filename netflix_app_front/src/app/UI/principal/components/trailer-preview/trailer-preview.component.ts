import { Component, Input, effect, inject, signal } from '@angular/core';
import { TrailerServService } from 'src/app/UI/services/trailer-serv.service';
import { Content } from 'src/app/domain/models/content/content';

@Component({
  selector: 'app-trailer-preview',
  templateUrl: './trailer-preview.component.html',
  styleUrls: ['./trailer-preview.component.css']
})
export class TrailerPreviewComponent {

  @Input() content!: Content;
  
  private trailerServ = inject( TrailerServService )
  public  volumeOn      = signal<boolean>( true )

  ngOnInit(): void {
   
    const video   = document.querySelector("video")
    video!.muted = true

    const isPlaying = video!.currentTime > 0 && !video!.paused && !video!.ended 
    && video!.readyState > video!.HAVE_CURRENT_DATA;

    if(!isPlaying){

      video?.play()
    }

    this.pauseInFirstFotogram( )

  }
  


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    const video   = document.querySelector("video")
    video!.muted = true
  }

  pauseInFirstFotogram( ){
    const video   = document.querySelector("video")
    setTimeout( () =>{
      video?.pause()
    }, 200)
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
    this.trailerServ.playTrailer( this.content )
  }
}
