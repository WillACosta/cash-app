import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { TransactionsServiceMock } from 'src/app/core/spec/mocks';
import { TransactionsService } from 'src/app/services/transactions.service';
import { MainState } from '../../store/state/main.state';
import { DashboardComponent } from './dashboard.component';

xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [NgxsModule.forRoot([MainState]), HttpClientTestingModule],
      providers: [{ TransactionsService, useClass: TransactionsServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the resum items', () => {
    const resumItems =
      fixture.debugElement.nativeElement.querySelectorAll('.resum-item');

    expect(resumItems.length).toBe(3);
  });
});
