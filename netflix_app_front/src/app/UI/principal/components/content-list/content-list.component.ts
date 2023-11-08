import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/domain/models/content/content';
import { User } from 'src/app/domain/models/user/user';


@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit{

  @Input() user      !: User      | null;
  @Input() loaded     : boolean = false;
  @Input() contents  !: Content[] | null;
  @Input() title     !: string;

  ngOnInit(): void {}

  getFavoriteContents(): Content[] {
    if (!this.user || !this.user.favoriteList) return [];

    const favorites: Array<Content> = [];

    for (let content of this.user.favoriteList) {
      if (typeof content !== 'string') {
        favorites.push(content);
      }
    }
    return favorites;
  }

}
