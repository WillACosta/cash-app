import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [DashboardComponent, MainComponent, TransactionsComponent, SettingsComponent],
  imports: [CommonModule, MainAppRoutingModule, ComponentsModule],
})
export class MainAppModule {}
