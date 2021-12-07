import { transactionsBaseUrl, reqresBaseUrl } from '../app/core/utils';

export const environment = {
  production: true,
  appApis: {
    login: `${reqresBaseUrl}/login`,
    transactions: `${transactionsBaseUrl}/transactions`,
  },
};
