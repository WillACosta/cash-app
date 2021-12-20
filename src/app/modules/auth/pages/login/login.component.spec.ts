import { Router } from '@angular/router';

import { Actions, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';

import { provider } from '../../../../core/spec';
import { Login } from '../../store/actions/auth.actions';
import { LoginComponent } from './login.component';
import { AccountProps } from '../../../../models/account-props.model';
import { of } from 'rxjs';

const storeMock = {
  dispatch: jest.fn(),
  selectSnapshot: jest.fn(),
};

const actionsMock$ = of({});

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
  let actions: typeof actionsMock$;
  let store: typeof storeMock;

  beforeEach(() => {
    store = storeMock;
    router = routerMock;
    actions = actionsMock$;

    component = new LoginComponent(
      provider(router),
      provider(toastrService),
      provider(store),
      provider(actions)
    );
  });

  test('should create component', () => {
    expect(component).toBeTruthy();
  });

  test('should call generateLoginForm', () => {
    const generateLoginFormSpy = jest.spyOn(component, 'generateLoginForm');
    component.ngOnInit();
    expect(generateLoginFormSpy).toHaveBeenCalled();
  });

  test('should generate loginForm with default values', () => {
    const expectedValue: AccountProps = {
      email: '',
      password: '',
    };

    component.generateLoginForm();
    expect(component.loginForm.value).toEqual(expectedValue);
  });

  test('should dispatch the `Login` action', () => {
    store.dispatch(loginAction);
    store.dispatch.mockReturnValue(Promise.resolve());

    expect(store.dispatch).toBeCalled();
    expect(store.dispatch).toBeCalledWith(loginAction);
  });
});
