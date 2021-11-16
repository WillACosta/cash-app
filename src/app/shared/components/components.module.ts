import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FormFieldComponent } from './atoms/form-field/form-field.component';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from './atoms/logo/logo.component';

@NgModule({
  declarations: [FormFieldComponent, LogoComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [FormFieldComponent, LogoComponent],
})
export class ComponentsModule {}
