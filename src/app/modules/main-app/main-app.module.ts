import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { MainAppRoutingModule } from './main-app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MainState } from './store/state/main.state';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    TransactionsComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    MainAppRoutingModule,
    ComponentsModule,
    NgxsModule.forFeature([MainState]),
  ],
})
export class MainAppModule {}
