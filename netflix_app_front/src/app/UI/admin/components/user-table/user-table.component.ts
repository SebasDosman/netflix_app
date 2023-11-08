import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/domain/models/user/user';
import { UserServiceService } from 'src/app/infraestructure/driven-adapter/user-api/user-service.service';
import { DeleteComponent } from '../delete/delete.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  userList: User[] = []

  displayedColumns: string[] = ['name', 'email', 'roles', 'imageUrl', 'actions']
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  private userService = inject(UserServiceService);
  private dialog = inject(MatDialog)
  private messageService = inject(MessageService)

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll()
      .subscribe((res: User[]) => {
        this.userList = res;
        this.dataSource = new MatTableDataSource(this.userList)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
  }

  openAddEditForm() {
    const dialogRef = this.dialog.open(AddEditUserComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers()
        }
      }
    })
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers()
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
      title: 'Delete User',
      name: row.name
    }

    const dialogRef = this.dialog.open(DeleteComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(row._id)?.subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `User: ${row.name} deleted correctly` });
            this.getUsers()
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        })
      }
    })
  }
}
