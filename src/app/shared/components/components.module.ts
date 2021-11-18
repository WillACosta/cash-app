import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormFieldComponent } from './atoms/form-field/form-field.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { LogoComponent } from './atoms/logo/logo.component';
import { LoadingButtonComponent } from './atoms/loading-button/loading-button.component';

@NgModule({
  declarations: [
    FormFieldComponent,
    LogoComponent,
    SidebarComponent,
    LoadingButtonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    FormFieldComponent,
    LogoComponent,
    LoadingButtonComponent,
    SidebarComponent,
  ],
})
export class ComponentsModule {}
