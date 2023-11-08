import { Component, Input, inject, signal } from '@angular/core';
import { Content } from '../../../../domain/models/content/content';
import { TrailerServService } from 'src/app/UI/services/trailer-serv.service';
import { StorageService } from 'src/app/UI/services/storage.service';

@Component({
  selector: 'app-info-principal-data',
  templateUrl: './info-principal-data.component.html',
  styleUrls: ['./info-principal-data.component.css']
})
export class InfoPrincipalDataComponent {

  public liked:boolean = false

  @Input() content!: Content;
  private trailerServ = inject( TrailerServService )
  private storageServ = inject( StorageService )

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.liked = this.storageServ.validateIfExistFavorite( this.content._id! )
  }
  
  play(){

    this.storageServ.addToHistory( this.content )
    this.trailerServ.playTrailer( this.content )
  }

  like(){
    this.storageServ.updateFavoriteToUserList( this.content )
    this.liked = !this.liked
  }


}
