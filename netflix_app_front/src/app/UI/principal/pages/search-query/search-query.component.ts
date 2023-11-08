import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/UI/services/search.service';
import { Content } from 'src/app/domain/models/content/content';
import { User } from 'src/app/domain/models/user/user';
import { JwtLocalManageService } from 'src/app/infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';
import { query } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-query',
  templateUrl: './search-query.component.html',
  styleUrls: ['./search-query.component.css']
})
export class SearchQueryComponent {
  private router = inject( Router )
  private jwt    = inject( JwtLocalManageService )
  private searchServ = inject( SearchService)

  public user    : User | null        = null
  public contents: any   = null

  public loaded: boolean = false 
  actualQuery: string = ""

  private subscriptionResults !: Subscription;

  ngOnInit(): void {
    this.subscribeChangesResult()

    const token = this.jwt.getTokenFromLocal()
    if ( !token ) {
      this.router.navigate(['auth']);
    }else{
      
      this.actualQuery = this.searchServ.getQueryBySession()
      this.user     = JSON.parse( sessionStorage.getItem("user")! )
      
      }
    
  } 

  subscribeChangesResult(){
    this.subscriptionResults = this.searchServ.resultadosCompartidos$.subscribe({
      next: data => {
        this.actualQuery = this.searchServ.getQueryBySession()
        this.contents = data 
      }, 
      error: err =>{
        console.log("Error in subscribeChangesResult search-query-componente -> ")
        console.log( err )
      }
    })
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

    if( this.subscriptionResults ) this.subscriptionResults.unsubscribe()
  }
  validarLoaded( user: any, contents: any ){
      
      // if( user && contents ) this.loaded = true 
      // else this.router.navigate(["/principal/home"])
  }
}
