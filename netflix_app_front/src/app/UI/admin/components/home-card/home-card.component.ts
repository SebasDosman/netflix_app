import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from 'src/app/UI/services/storage.service';
import { JwtLocalManageService } from 'src/app/infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';

@Component({
    standalone: true,
    selector: 'app-home-card',
    templateUrl: './home-card.component.html',
    styleUrls: ['./home-card.component.css'],
})
export class HomeCardComponent implements OnInit {

  private storage = inject( StorageService )
  private jwt     = inject( JwtLocalManageService );
  private router  = inject( Router );

  @Output() showContentComponent: EventEmitter<void> = new EventEmitter();
  @Output() showGenreComponent: EventEmitter<void> = new EventEmitter();
  @Output() showUserComponent: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onContentsClicked() {
    this.showContentComponent.emit();
  }
  
  onGenreClicked(){
    this.showGenreComponent.emit();
  }

  onUserClicked() {
    console.log('Test Click!');
    this.showUserComponent.emit();
  }

  logOut(){
    this.storage.deleteAllSessionStorage();
    this.jwt.deleteTokenFromLocal();
    
    const navigationSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
        navigationSubscription.unsubscribe();
      }
    });

    this.router.navigate(['auth']);

  }

}
