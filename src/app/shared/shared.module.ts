import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';

import { ApiErrorState } from './store/api-error/api-error.state';
import { ThemeState } from './store/theme/theme.state';
import { ThemeService } from './services/theme.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    NgxsModule.forFeature([ApiErrorState, ThemeState]),
  ],
  providers: [ThemeService],
})
export class SharedModule {}
