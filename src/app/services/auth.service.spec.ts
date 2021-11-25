import { HttpClient } from '@angular/common/http';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { Account } from '../models/account.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request to login and return user token', (done) => {
    const fakeBody = JSON.stringify({
      email: 'email@example.com',
      password: '123fake',
    });

    service.login('email@example.com', '123fake').subscribe((response) => {
      expect(response).toEqual({} as Account);
      done();
    });

    const req = httpMock.expectOne('https://reqres.in/api/login');

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(fakeBody);

    req.flush({});
  });

  it('should request to login and return error', () => {
    spyOn(httpClient, 'post').and.returnValue(
      throwError(() => new Error('Failure'))
    );

    service.login('', '').subscribe((response) => {
      expect(response).toBeUndefined();
    });
  });
});
