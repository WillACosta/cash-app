import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
})
export class ConfirmDeleteDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
