import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalPrincipalService } from 'src/app/UI/services/modal-principal.service';
import { Content } from 'src/app/domain/models/content/content';



@Component({
  selector: 'app-principal-modal',
  templateUrl: './principal-modal.component.html',
  styleUrls: ['./principal-modal.component.css']
})
export class PrincipalModalComponent {

  private router    = inject( Router )
  private route     = inject( ActivatedRoute )
  private modalServ = inject( ModalPrincipalService )
  
  public localCont: Content | null = null;

  public showModal: boolean = false

  ngOnInit(): void {
    

    this.route.queryParams.subscribe( params =>{
      

      
      if( params['content'] ){
        this.localCont = this.modalServ.getContentModal() 
        this.showModal = true
      }
      else{
        // this.localCont = data
        this.showModal = false
      }
    })
  }


  closeModal(){
    
    this.showModal = false
    this.localCont = null
    const currentUrlWithoutQueryParams = this.router.url.split('?')[0]
    this.router.navigateByUrl( currentUrlWithoutQueryParams )
  }
}
