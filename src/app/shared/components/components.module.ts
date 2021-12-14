import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LogoComponent } from './atoms/logo/logo.component';
import { LoadingButtonComponent } from './atoms/loading-button/loading-button.component';
import { ThemeSwitcherComponent } from './atoms/theme-swicther/theme-switcher.component';

import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CTableComponent } from './molecules/c-table/c-table.component';
import { ButtonComponent } from './atoms/button/button.component';
import { ApiErrorDialogComponent } from './molecules/api-error-dialog/api-error-dialog.component';
import { TransactionDialogComponent } from './molecules/transaction-dialog/transaction-dialog.component';

import { MaterialModule } from '../material.module';
import { ConfirmDeleteDialogComponent } from './molecules/confirm-delete-dialog/confirm-delete-dialog.component';

@NgModule({
  declarations: [
    LogoComponent,
    SidebarComponent,
    LoadingButtonComponent,
    ThemeSwitcherComponent,
    CTableComponent,
    ButtonComponent,
    ApiErrorDialogComponent,
    TransactionDialogComponent,
    ConfirmDeleteDialogComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MaterialModule],
  exports: [
    LogoComponent,
    LoadingButtonComponent,
    SidebarComponent,
    ThemeSwitcherComponent,
    CTableComponent,
    ButtonComponent,
    TransactionDialogComponent,
  ],
})
export class ComponentsModule {}
