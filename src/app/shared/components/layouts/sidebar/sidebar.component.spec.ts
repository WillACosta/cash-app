import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Actions, NgxsModule, ofActionSuccessful, Store } from '@ngxs/store';

import { AuthServiceMock, fakeRoutes } from 'src/app/core/spec/mocks';
import { Logout } from 'src/app/modules/auth/store/actions/auth.actions';
import { AuthState } from 'src/app/modules/auth/store/state/auth.state';
import { AuthService } from 'src/app/services/auth.service';

import { SidebarComponent } from './sidebar.component';

xdescribe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let store: Store;
  let router: Router;
  let actions$: Actions;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([AuthState]),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(fakeRoutes),
      ],
      declarations: [SidebarComponent],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    actions$ = TestBed.inject(Actions);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch Logout Action', () => {
    spyOn(store, 'dispatch');
    store.dispatch(new Logout());

    expect(store.dispatch).toHaveBeenCalledWith(new Logout());
  });

  it('should redirect to `/auth` route when logout is successful', (done) => {
    actions$.pipe(ofActionSuccessful(Logout)).subscribe(() => {
      done();
    });

    spyOn(router, 'navigate');
    store.dispatch(new Logout());

    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
