import { Component,  Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/UI/services/search.service';
import { Content } from 'src/app/domain/models/content/content';
import { User } from 'src/app/domain/models/user/user';

@Component({
  selector    : 'app-principal-component',
  templateUrl : './principal-component.component.html',
  styleUrls   : ['./principal-component.component.css']
})
export class PrincipalComponentComponent {

  @Input() loaded     : boolean = false
  @Input() user      !: User
  @Input() contents  !: Content[]

  private searchServ = inject( SearchService )
  private router = inject(Router)

  ngOnInit(): void {
    this.searchServ.deleteQuerySession()
  }
}
