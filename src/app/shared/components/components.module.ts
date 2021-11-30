import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { LogoComponent } from './atoms/logo/logo.component';
import { LoadingButtonComponent } from './atoms/loading-button/loading-button.component';
import { ThemeSwitcherComponent } from './atoms/theme-swicther/theme-switcher.component';

import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CTableComponent } from './molecules/c-table/c-table.component';

@NgModule({
  declarations: [
    LogoComponent,
    SidebarComponent,
    LoadingButtonComponent,
    ThemeSwitcherComponent,
    CTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    LogoComponent,
    LoadingButtonComponent,
    SidebarComponent,
    ThemeSwitcherComponent,
    CTableComponent,
  ],
})
export class ComponentsModule {}
