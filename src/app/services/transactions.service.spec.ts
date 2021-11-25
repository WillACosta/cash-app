// import { fakeAsync, TestBed } from '@angular/core/testing';

// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';

// import { TransactionsService } from './transactions.service';
// import { transactionsBaseUrl } from '../core/utils/constants';
// import { Transaction } from '../models/transaction.model';

// describe('TransactionsService', () => {
//   let service: TransactionsService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//     });

//     service = TestBed.inject(TransactionsService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should perform a GET request and called one time', (done) => {
//     service.getTransactions().subscribe((_) => {
//       done();
//     });

//     const req = httpMock.expectOne(
//       (req) =>
//         req.method === 'GET' &&
//         req.url === `${transactionsBaseUrl}/transactions`
//     );

//     req.flush('Get');
//   });

//   it('should return an Observable<Transaction[]>', () => {
//     expect(service.getTransactions()).toBeTruthy();
//   });

//   it('should return a array of Transaction', fakeAsync(() => {
//     service.getTransactions().subscribe((transactions) => {
//       expect(transactions).toBe([] as Transaction[]);
//     });
//   }));
// });

describe('TransactionsService', () => {

  beforeEach(() => {

  });

});
