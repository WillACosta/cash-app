import { Component, NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-api-error-dialog',
  templateUrl: './api-error-dialog.component.html',
})
export class ApiErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApiErrorDialogComponent>,
    private ngZone: NgZone
  ) {}

  retryClicked() {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
}
