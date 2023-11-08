import { Component, signal, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { JwtLocalManageService } from 'src/app/infraestructure/driven-adapter/jwt-api/jwt-local-manage.service';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Subject, debounceTime, of, switchMap, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';


interface navBarOption{
  title: string;
  url  : string;
}


@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports:  [ CommonModule, RouterModule, FormsModule ]
})
export class NavbarComponent implements OnInit{

  links = signal<navBarOption[]>([
    { title: 'Home'    , url: '/principal/home'     },
    { title: 'Series'  , url: '/principal/series'   },
    { title: 'Films'   , url: '/principal/films'    },
    { title: 'New'     , url: '/principal/new'      },
    { title: 'My List' , url: '/principal/my-list'  }
  ])

  private destroy$: Subject<void> = new Subject();
  private searchQuery$: Subject<string> = new Subject()
  searchQuery: string = ""

  username = "";
  email = "";
  icon = "";
  exploreNavVisible = false;
  searchHidden = true;
  menuHidden = true;
  mobileMenuHidden = true;
  isMobile = false;
  isNavbarSticky = false;

  constructor(
    private renderer       : Renderer2,
    private el             : ElementRef,
    private storage        : StorageService,
    private jwt            : JwtLocalManageService,
    private messageService : MessageService,
    private router         : Router,
    private searchServ     : SearchService
  ) {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    this.searchQuery$
    .pipe(
      debounceTime(300),
      switchMap((query) => {
          this.searchServ.searchByQuery(query)
          return of(null)
      }),
      takeUntil(this.destroy$)
    )
    .subscribe();

    this.updateFromRoute()
    this.searchQuery = this.updateQuery( this.searchServ.getQueryBySession() )

    const stringUser = sessionStorage.getItem("user")

    if (stringUser !== null) {

      const user = JSON.parse(stringUser);
      this.username = user.name;
      this.email = user.email;
      this.icon = user.imageUrl;
    }

    this.validateHiddenFromSessionQuery( this.searchQuery )
  }

  updateFromRoute(){
    if( this.router.url.split("/")[2] === "search") {
      this.searchQuery = this.searchServ.compareQueryFromInputWithRoute( this.searchQuery )
      this.updateQuery( this.searchQuery )
    }
  }

  updateQuery( query: string ){
    this.searchQuery$.next( query )
    return query
  }

  validateHiddenFromSessionQuery( query: string){
    if( !query || query === "" ) {
      this.searchHidden = true
    }
    else {
      this.searchHidden = false
      this.el.nativeElement.querySelector('#search-input').focus();
    }
  }

  onSearchInput(){
    this.updateQuery( this.searchQuery )
  }

  toggleSearch() {
    this.searchHidden = !this.searchHidden;
    if (!this.searchHidden) {
      const searchInput = document.getElementById('search-input');
      const buscadorDiv = document.getElementById('buscador');

      if (searchInput && buscadorDiv) {
        searchInput.classList.remove('hidden');
        buscadorDiv.classList.add('activo');
        searchInput.focus();
      }
    }
  }

  logOut(){
    this.messageService.add({severity:'success', summary:'Success', detail:'See you later ' + this.username});

    this.storage.deleteAllSessionStorage();
    this.jwt.deleteTokenFromLocal();
    this.router.navigate(['/auth'])
    window.location.reload();
  }

  toggleExploreNav() {
    this.exploreNavVisible = !this.exploreNavVisible;
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
    if (!this.menuHidden) {
      const menu = document.getElementById('menu');

      if (menu) {
        menu.classList.remove('hidden');
        menu.focus();
      }
    }
  }

  toggleMobileMenu() {
    this.mobileMenuHidden = !this.mobileMenuHidden;
  }

  @HostListener('window:resize', ['$event'])
  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 930;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const navbar = this.el.nativeElement.querySelector('.navbar');

    if (scrollY > 45) {
      this.renderer.addClass(navbar, 'navbar-scroll');
    } else {
      this.renderer.removeClass(navbar, 'navbar-scroll');
    }
  }
}
