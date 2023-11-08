import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { Genre } from 'src/app/domain/models/genre/genre';
import { GenreServiceService } from 'src/app/infraestructure/driven-adapter/genre-api/genre-service.service';


@Component({
  selector: 'app-add-edit-genre',
  templateUrl: './add-edit-genre.component.html',
  styleUrls: ['./add-edit-genre.component.css']
})
export class AddEditGenreComponent {

  genres: Genre[] = []
  genreForm: FormGroup;

  private fb = inject(FormBuilder);
  private genreService = inject(GenreServiceService);
  private dialogRef = inject(MatDialogRef<AddEditGenreComponent>)
  private messageService = inject(MessageService)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.genreForm = this.fb.group({
      id: '',
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })

    if (this.data && this.data.name) {
      const idGenre = this.data.id;
      this.genreForm.get('id')?.setValue(idGenre)
      this.genreForm.patchValue(this.data)
    }
  }

  ngOnInit(): void {
    this.genreForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.genreForm.valid) {
      if (this.data) {
        const updateGenre = {
          name: this.genreForm.get('name')?.value,
          description: this.genreForm.get('description')?.value,
        }

        this.genreService.updateGenre(this.data._id, updateGenre)
          .subscribe({
            next: (val: any) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: `Genre: ${updateGenre.name} updated correctly` });
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            }
          })
      } else {
        const newGenre = {
          name: this.genreForm.get('name')?.value,
          description: this.genreForm.get('description')?.value,
        }

        this.genreService.postGenre(newGenre).subscribe({
          next: (val: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `Genre: ${newGenre.name} created correctly` });
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        })
      }
    }
  }
}
