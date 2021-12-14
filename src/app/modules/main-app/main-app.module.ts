import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';
import { NgxsModule } from '@ngxs/store';

import { MainAppRoutingModule } from './main-app-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LineChartComponent } from './pages/dashboard/components/line-chart/line-chart.component';
import { MaterialModule } from 'src/app/shared/material.module';

import { MainState } from './store/state/main.state';
import { TransactionsState } from './pages/transactions/store/transactions.state';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    TransactionsComponent,
    SettingsComponent,
    LineChartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainAppRoutingModule,
    ComponentsModule,
    NgChartsModule,
    MaterialModule,
    NgxsModule.forFeature([MainState, TransactionsState]),
  ],
})
export class MainAppModule {}
