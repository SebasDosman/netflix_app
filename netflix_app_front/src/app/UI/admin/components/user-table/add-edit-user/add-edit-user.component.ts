import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from 'src/app/infraestructure/driven-adapter/auth-api/auth-service.service';
import { UserServiceService } from 'src/app/infraestructure/driven-adapter/user-api/user-service.service';


@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent {
  icons = [
    { name: 'Icono 1', url: './assets/icon1.png' },
    { name: 'Icono 2', url: './assets/icon2.png' },
    { name: 'Icono 3', url: './assets/icon3.png' },
    { name: 'Icono 4', url: './assets/icon4.png' }
  ];

  userForm: FormGroup;

  private fb = inject(FormBuilder);
  private userService = inject(UserServiceService);
  private authService = inject(AuthServiceService)
  private dialogRef = inject(MatDialogRef<AddEditUserComponent>)
  private messageService = inject(MessageService)


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.userForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      favoriteList: [],
      historyList: [],
    })

    if (this.data && this.data.name) {
      const idUser = this.data.id;
      this.userForm.get('id')?.setValue(idUser)
      this.userForm.patchValue(this.data)
    }
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data)
  }

  onFormSubmit() {
    
    if (this.userForm.valid) {

      if (this.data) {

        const updateUser = {
          name: this.userForm.get('name')?.value,
          email: this.userForm.get('email')?.value,
          imageUrl: this.userForm.value['imageUrl'].url
        }

        this.userService.updateUser(this.data._id, updateUser)
          ?.subscribe({
            next: (val: any) => {
              this.messageService.add({severity:'success', summary:'Success', detail:`User: ${updateUser.name} updated correctly`});
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.messageService.add({severity:'error', summary:'Error', detail:err.error.message});
            }
          })
      } else {
        const newUser = {
          name: this.userForm.get('name')?.value,
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('email')?.value,
          imageUrl: this.userForm.value['imageUrl'].url,
          favoriteList: [],
          historyList: [],
        }

        this.authService.register(newUser)
          ?.subscribe({
            next: (val: any) => {
              this.messageService.add({severity:'success', summary:'Success', detail:`User: ${newUser.name} created correctly`});
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.messageService.add({severity:'error', summary:'Error', detail:err.error.message});
            }
          })

      }
    }
  }
}
