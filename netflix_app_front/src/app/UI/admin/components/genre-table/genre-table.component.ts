import { Genre } from './../../../../domain/models/genre/genre';
import { ViewChild, inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GenreServiceService } from 'src/app/infraestructure/driven-adapter/genre-api/genre-service.service';
import { AddEditGenreComponent } from './add-edit-genre/add-edit-genre.component';
import { DeleteComponent } from '../delete/delete.component';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-genre-table',
  templateUrl: './genre-table.component.html',
  styleUrls: ['./genre-table.component.css']
})
export class GenreTableComponent implements OnInit {
  genreList: Genre[] = []

  displayedColumns: string[] = ['name', 'description', 'isActive', 'actions']
  dataSource!: MatTableDataSource<Genre>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  private genreService = inject(GenreServiceService);
  private dialog = inject(MatDialog)
  private messageService = inject(MessageService)

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.genreService.getAll()
      .subscribe((res: Genre[]) => {
        this.genreList = res;
        this.dataSource = new MatTableDataSource(this.genreList)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
  }

  openAddEditForm() {
    const dialogRef = this.dialog.open(AddEditGenreComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGenres()
        }
      }
    })

  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(AddEditGenreComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGenres()
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
      title: 'Delete Genre',
      name: row.name
    }

    const dialogRef = this.dialog.open(DeleteComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.genreService.deleteGenre(row._id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `Genre: ${row.name} deleted correctly` });
            this.getGenres()
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        })
      }
    })
  }
}
