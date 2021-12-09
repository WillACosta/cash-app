import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';

import { ApiErrorState } from './store/api-error/api-error.stat';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    NgxsModule.forFeature([ApiErrorState]),
  ],
})
export class SharedModule {}
