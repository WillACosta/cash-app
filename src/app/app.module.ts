import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthState } from './modules/auth/store/state/auth.state';

import { ToastrModule } from 'ngx-toastr';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import {
  ngxsModuleConfig,
  ngxsStoragePluginConfig,
  toastrModuleConfig,
} from './core/app.module.configurations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(toastrModuleConfig),
    NgxsModule.forRoot([AuthState], ngxsModuleConfig),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(ngxsStoragePluginConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
