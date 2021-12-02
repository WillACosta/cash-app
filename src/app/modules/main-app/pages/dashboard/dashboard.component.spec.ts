import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsModule } from '@ngxs/store';

import { TransactionsServiceMock } from 'src/app/core/spec/mocks';
import { TransactionsService } from 'src/app/services/transactions.service';
import { MainState } from '../../store/state/main.state';
import { DashboardComponent } from './dashboard.component';

xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [NgxsModule.forRoot([MainState]), HttpClientTestingModule],
      providers: [
        {
          provide: TransactionsService,
          useClass: TransactionsServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sum incoming transactions and `totalIncomingAmount` to be 200 ', (done) => {
    component.incomingTransactions$.subscribe((transactions) => {
      expect(transactions.length).toBe(1);
      expect(component.totalIncomingAmount).toBe(200);
      done();
    });
  });

  it('should sum expense transactions and `totalExpenseAmount` to be 100 ', (done) => {
    component.expenseTransactions$.subscribe((transactions) => {
      expect(transactions.length).toBe(1);
      expect(component.totalExpenseAmount).toBe(100);
      done();
    });
  });
});
