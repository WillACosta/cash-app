import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from 'src/app/services/auth.service';

import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/state/auth.state';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ComponentsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    NgxsModule.forFeature([
      AuthState,
    ])
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService],
})
export class AuthModule {}
