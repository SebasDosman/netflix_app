import { Component, Input, inject } from '@angular/core';
import { SearchService } from 'src/app/UI/services/search.service';
import { Content } from 'src/app/domain/models/content/content';
import { User } from 'src/app/domain/models/user/user';

@Component({
  selector: 'app-secondary-component',
  templateUrl: './secondary-component.component.html',
  styleUrls: ['./secondary-component.component.css']
})
export class SecondaryComponentComponent{

  @Input() loaded     : boolean = false
  @Input() user      !: User      | null
  @Input() contents  !: Content[] | null
  @Input() title     !: string;

  private searchServ = inject( SearchService )
  
  constructor(){}

  ngOnInit(): void {
    this.searchServ.deleteQuerySession()
  }
}