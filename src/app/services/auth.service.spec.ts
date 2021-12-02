import { throwError, of } from 'rxjs';

import { fakeHttpClient, provider } from '../core/spec/mocks';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService(provider(fakeHttpClient));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request to login and return user token', () => {
    const serviceResponse = { token: 'token' };
    fakeHttpClient.post.mockImplementationOnce(() => of({ token: 'token' }));

    const fakeBody = JSON.stringify({
      email: 'email@example.com',
      password: '123fake',
    });

    service.login('email@example.com', '123fake').subscribe((response) => {
      expect(fakeHttpClient).toBeCalledWith(
        'https://reqres.in/api/login',
        fakeBody
      );

      expect(response).toEqual({ token: 'token' });
    });
  });

  it('should request to login and return error', () => {
    jest.spyOn(fakeHttpClient, 'post').mockReturnValue(
      throwError(() => {
        throw new Error('error');
      })
    );

    service.login('', '').subscribe((response) => {
      expect(response).toBeInstanceOf(Error);
    });
  });
});
