import { Component, Input } from '@angular/core';
import { Content } from 'src/app/domain/models/content/content';

@Component({
  selector: 'app-list-data-principal',
  templateUrl: './list-data-principal.component.html',
  styleUrls: ['./list-data-principal.component.css']
})
export class ListDataPrincipalComponent {

  @Input() contents!: Content[] | null

  // tagsObjects !: Content[] | null;
  tagsObjects  : Record<string, any> = {};
  listTags    !: string[]  | null;
  name : string = "";
  isVisible = false;

  public contentList: Content[] = [];
  public user = JSON.parse(sessionStorage.getItem("user")!);

  ngOnInit(): void {
    this.name = this.user.name;
    this.tagsObjects = this.getDifferentsContentsByTags( this.contents );
    this.listTags = Object.keys( this.tagsObjects );
    this.contentList = this.getHistoryContents();
  }

  getHistoryContents(): Content[] {
    if (!this.user || !this.user.historyList) return [];

    const history: Array<Content> = [];

    for (let content of this.user.historyList) {
      if (typeof content !== 'string') {
        history.push(content);
      }
    }
    return history;
  }

  getDifferentsContentsByTags( contents: Content[] | null ): Content[]{

    let objectTags: any = {}

    if( !contents ) return []

    contents.forEach( content =>{

      content.tags.forEach( tag =>{

        if( !(tag in objectTags) ){

          objectTags[tag] = [ ]
          objectTags[tag].push( content )
        } else{
          objectTags[tag].push( content )
        }
      })
    })
    return objectTags
  }
}
