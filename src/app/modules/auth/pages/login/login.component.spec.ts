import { Router } from '@angular/router';

import { Actions, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';

import { provider } from '../../../../core/spec/mocks';
import { Login } from '../../store/actions/auth.actions';
import { LoginComponent } from './login.component';

const storeMock = {
  dispatch: jest.fn(),
};

const actionsMock$ = {
  pipe: jest.fn(),
};

const routerMock = {
  navigate: jest.fn(),
};

const loginAction = new Login({
  email: 'email@test.com',
  password: 'test',
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let toastrService: ToastrService;
  let router: typeof routerMock;
  let actions$: typeof actionsMock$;
  let store: typeof storeMock;

  beforeEach(() => {
    store = storeMock;
    router = routerMock;
    actions$ = actionsMock$;

    component = new LoginComponent(
      provider(router),
      provider(toastrService),
      provider(store),
      provider(actions$)
    );
  });

  test('should create component', () => {
    expect(component).toBeTruthy();
  });

  test('should dispatch the `Login` action', () => {
    store.dispatch(loginAction);
    store.dispatch.mockReturnValue(Promise.resolve());

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(loginAction);
  });

  test('should navigate to the initial route when Login action is successful', () => {
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve());

    store.dispatch(loginAction);
    store.dispatch.mockResolvedValueOnce(
      router.navigate.mockReturnValue(Promise.resolve())
    );

    expect(router.navigate).toHaveBeenCalled();

    // actionsMock$.pipe.mockReturnValue();
  });

  // it('should verify if user is redirected to initial route after LoginAction is successful', (done) => {
  //   actions$.pipe(ofActionSuccessful(Login)).subscribe(() => {
  //     done();
  //   });

  //   spyOn(router, 'navigate');
  //   store.dispatch(new Login({ email: '', password: '' }));

  //   expect(router.navigate).toHaveBeenCalledWith(['']);
  // });
});
