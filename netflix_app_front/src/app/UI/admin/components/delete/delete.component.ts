import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  name !: string;
  title !: string;

  private dialogRef = inject( MatDialogRef<DeleteComponent> )

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.name = data.name
    this.title = data.title
  }

  close() {
    this.dialogRef.close()
  }

  delete() {
    const deleteObject = true;
    this.dialogRef.close( deleteObject )
  }
}
