import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Content } from 'src/app/domain/models/content/content';
import { Genre } from 'src/app/domain/models/genre/genre';
import { ContentServiceService } from 'src/app/infraestructure/driven-adapter/content-api/content-service.service';
import { GenreServiceService } from 'src/app/infraestructure/driven-adapter/genre-api/genre-service.service';
import { DeleteComponent } from '../delete/delete.component';
import { AddEditContentComponent } from './add-edit-content/add-edit-content.component';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-content-table',
  templateUrl: './content-table.component.html',
  styleUrls: ['./content-table.component.css']
})
export class ContentTableComponent implements OnInit {
  contentList: Content[] = [];
  genreList: Genre[] = [];

  displayedColumns: string[] = ['title', 'genreList', 'castList', 'releaseAt', 'classification', 'duration', 'tags', 'description', 'image', 'isFilm', 'isActive', 'actions'];
  dataSource: MatTableDataSource<Content> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private ContentService = inject(ContentServiceService);
  private GenreService = inject(GenreServiceService);
  private dialog = inject(MatDialog)
  private messageService = inject(MessageService)

  ngOnInit(): void {
    this.getGenres()
    this.getContents();
  }

  getContents() {
    this.ContentService.getAll()
      ?.subscribe((res: Content[]) => {
        this.contentList = res;
        this.dataSource = new MatTableDataSource(this.contentList)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
  }

  getGenres() {
    this.GenreService.getAll()
      ?.subscribe((res: Genre[]) => {
        this.genreList = res;
      })
  }

  truncateList(List: string[], maxLength: number = 1): string {
    if (List.length <= maxLength) {
      return List.join(', ');
    } else {
      const truncatedList = List.slice(0, maxLength);
      return `${truncatedList.join(', ')} and ${List.length - maxLength} more`;
    }
  }

  truncate(description: string, maxLength: number = 20): string {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substr(0, maxLength) + '...';
    }
  }


  getGenreNames(genreIds: string[]) {
    const genreNames: string[] = []

    genreIds.forEach(genreId => {
      const genre = this.genreList.find(g => g._id === genreId);
      if (genre) {
        genreNames.push(genre.name);
      }
    })
    return genreNames
  }

  openAddEditForm() {
    const dialogRef = this.dialog.open(AddEditContentComponent, {
      // height: '700px'
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContents()
        }
      }
    })

  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(AddEditContentComponent, {
      data,
      // height: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContents()
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Delete Content',
      name: row.name
    }

    const dialogRef = this.dialog.open(DeleteComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ContentService.deleteContent(row._id)?.subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `Content: ${row.name} deleted correctly` });
            this.getContents()
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        })
      }
    })
  }
}
