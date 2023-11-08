import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { Content } from 'src/app/domain/models/content/content';
import { Genre } from 'src/app/domain/models/genre/genre';
import { ContentServiceService } from 'src/app/infraestructure/driven-adapter/content-api/content-service.service';
import { GenreServiceService } from 'src/app/infraestructure/driven-adapter/genre-api/genre-service.service';


@Component({
  selector: 'app-add-edit-content',
  templateUrl: './add-edit-content.component.html',
  styleUrls: ['./add-edit-content.component.css']
})
export class AddEditContentComponent {
  tagList: string[] = ['Popular on Netflix', 'Trending Now', 'TV Shows', 'Netflix Originals', 'New releases', 'Comedy content', 'Animated content'];
  genres: Genre[] = [];
  contents: Content[] = [];
  contentForm: FormGroup;

  private fb = inject(FormBuilder);
  private genreService = inject(GenreServiceService);
  private contentService = inject(ContentServiceService);
  private dialogRef = inject(MatDialogRef<AddEditContentComponent>)
  private messageService = inject(MessageService)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.contentForm = this.fb.group({
      id: '',
      isFilm: ['', [Validators.required]],
      title: ['', [Validators.required]],
      trailer: ['', [Validators.required]],
      image: ['', [Validators.required]],
      releaseAt: ['', [Validators.required]],
      classification: ['', [Validators.required]],
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      castList: ['', [Validators.required]],
      genreList: ['', [Validators.required]],
    })

    if (this.data && this.data.name) {
      const idContent = this.data.id;
      this.contentForm.get('id')?.setValue(idContent)
      this.contentForm.patchValue(this.data)
    }

    this.getGenres()
  }

  getGenres() {
    this.genreService.getAll()
      .subscribe((res: Genre[]) => {
        this.genres = res;
      })
  }

  ngOnInit(): void {
    this.contentForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.contentForm.valid) {
      let tags = this.contentForm.get('tags')?.value.toString();
      let castList = this.contentForm.get('castList')?.value.toString();

      const tagsArray = tags.split(',').map((tag: string) => tag.trim());
      const castListArray = castList.split(',').map((cast: string) => cast.trim());

      if (this.data) {
        const updateContent = {
          isFilm: this.contentForm.get('isFilm')?.value,
          title: this.contentForm.get('title')?.value,
          trailer: this.contentForm.get('trailer')?.value,
          image: this.contentForm.get('image')?.value,
          releaseAt: this.contentForm.get('releaseAt')?.value,
          classification: this.contentForm.get('classification')?.value,
          description: this.contentForm.get('description')?.value,
          duration: this.contentForm.get('duration')?.value,
          tags: tagsArray,
          castList: castListArray,
          genreList: this.contentForm.get('genreList')?.value,
        }

        this.contentService.updateContent(this.data._id, updateContent)
          ?.subscribe({
            next: (val: any) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: `Content: ${updateContent.title} updated correctly` });
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            }
          })
      } else {
        const newContent = {
          isFilm: this.contentForm.get('isFilm')?.value,
          title: this.contentForm.get('title')?.value,
          trailer: this.contentForm.get('trailer')?.value,
          image: this.contentForm.get('image')?.value,
          releaseAt: this.contentForm.get('releaseAt')?.value,
          classification: this.contentForm.get('classification')?.value,
          description: this.contentForm.get('description')?.value,
          duration: this.contentForm.get('duration')?.value,
          tags: tagsArray,
          castList: castListArray,
          genreList: this.contentForm.get('genreList')?.value,
        }

        this.contentService.postContent(newContent)?.subscribe({
          next: (val: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `Content: ${newContent.title} created correctly` });
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
