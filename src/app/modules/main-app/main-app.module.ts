import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { NgChartsModule } from 'ng2-charts';
import { NgxsModule } from '@ngxs/store';

import { MainAppRoutingModule } from './main-app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MainState } from './store/state/main.state';
import { LineChartComponent } from './pages/dashboard/components/line-chart/line-chart.component';

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
    MainAppRoutingModule,
    ComponentsModule,
    NgChartsModule,
    MatButtonModule,
    NgxsModule.forFeature([MainState]),
  ],
})
export class MainAppModule {}
