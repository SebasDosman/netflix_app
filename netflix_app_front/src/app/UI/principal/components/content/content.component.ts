import { Component, ElementRef, Input, OnInit, ViewChild, ChangeDetectorRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalPrincipalService } from 'src/app/UI/services/modal-principal.service';
import { StorageService } from 'src/app/UI/services/storage.service';
import { TrailerServService } from 'src/app/UI/services/trailer-serv.service';
import { Content } from 'src/app/domain/models/content/content';
import { Genre } from 'src/app/domain/models/genre/genre';
import { AuthServiceService } from 'src/app/infraestructure/driven-adapter/auth-api/auth-service.service';
import { JwtLocalManageService } from 'src/app/infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit{
  
  @Input() content  !: Content | null;

  @ViewChild('videoElement', { static: false }) videoRef: ElementRef | undefined;
  
  private trailerServ = inject( TrailerServService );
  private storageServ = inject( StorageService );
  private router      = inject( Router );
  private modalServ   = inject( ModalPrincipalService );
  private jwt         = inject( JwtLocalManageService );
  private auth        = inject( AuthServiceService );
  
  public liked      : boolean = false;
  public volumeOn   : boolean = true;
  public matchNumber: number  = 0;
  public age        : any  = 0;

  constructor(){}

  ngOnInit(): void {
    this.isLiked();

    const video   = document.querySelector("video");
    video!.muted = true;

    const isPlaying = video!.currentTime > 0 && !video!.paused && !video!.ended 
    && video!.readyState > video!.HAVE_CURRENT_DATA;

    video!.muted = true
    if(!isPlaying){

      video?.play()
    }
    
    this.matchNumber = this.getRandomNumber();
    this.age = this.getAge();  
  }

  
  isLiked() {
    const user = JSON.parse(sessionStorage.getItem("user")!);

    if (!user || !user.favoriteList || !Array.isArray(user.favoriteList)) return;

    for (let favorite of user.favoriteList) {
      if (this.content?._id === favorite._id) {
        this.liked = true;
        break;
      }
    }
  }

  getAge(){
    return this.content?.classification;
  }

  getRandomNumber(){
    return Math.floor( Math.random() * ( 100 - 85 + 1 ) + 85 )
  }

  getGenres(){
    if (!this.content || !this.content.genreList) return [];
    const genres: Array<Genre> = [];
    for (let genre of this.content.genreList) {
      if (typeof genre !== 'string') {
        genres.push(genre);
      }
    }
    return genres;
  }

  openInfo(){
    this.modalServ.openModal( this.content! )
  }

  onMouseEnter(event: any): void {
    const videoElement: HTMLVideoElement = event.target;
    videoElement.play();
  }

  toggleVolume(event: any): void {
    event.preventDefault();
    
    const video: HTMLVideoElement = this.videoRef?.nativeElement;
    if (video) {
        video.muted = !video.muted;
    }
    this.volumeOn = !this.volumeOn;
  }

  muteVideo(): void {
    const video: HTMLVideoElement = this.videoRef?.nativeElement;
    if (video) {
        video.muted = true;
    }
  }

  play(){
    this.storageServ.addToHistory( this.content! );
    this.trailerServ.playTrailer( this.content! );
  }

  like(){
    this.storageServ.updateFavoriteToUserList( this.content! );
    this.liked = !this.liked;
    if( this.router.url === '/principal/my-list' ){
      // Aqui hay que arreglar el recargo del componente my list
    }
  }
}