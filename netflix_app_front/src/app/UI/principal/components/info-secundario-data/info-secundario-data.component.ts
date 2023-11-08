import { Component, Input } from '@angular/core';
import { Content } from 'src/app/domain/models/content/content';

@Component({
  selector: 'app-info-secundario-data',
  templateUrl: './info-secundario-data.component.html',
  styleUrls: ['./info-secundario-data.component.css']
})
export class InfoSecundarioDataComponent {
  // 0, 7, 10, 13, 16, 18

  @Input() content !: any;
  matchNumber: number = 0

  ngOnInit(): void {
    this.matchNumber = this.getRandomMatch()
  }

  getRandomMatch(){
    return Math.floor( Math.random() * ( 100 - 85 + 1 ) + 85 )
  }

  getReleaseDate(){
    return this.content.releaseAt.slice(0, 4)
  }

  getNumberClassification(){
    if( this.content.classification === 0 ) return "All Ages"
    else return this.content.classification + "+"
  }

  getMessagesClassification(): string{

    switch( this.content.classification ){

      case 0: 
        return ""

      case 7:
        return "mild Action, tense Moments"

      case 10:
        return "violence"
      case 13: 
        return "moderate Violence, languaje"

      case 16:
        return "intense Violence, languaje"

      case 18:
        return "languaje, nudity"
    }
    return ""
  }

  getLink( data:any ): string{
    return '/principal/search/' + data 
  }
}
