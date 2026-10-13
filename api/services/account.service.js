export class AccountService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  createAccount(accountDetails) {
    return this.apiClient.post('/api/createAccount', {
      form: accountDetails,
    });
  }

  updateAccount(accountDetails) {
    return this.apiClient.put('/api/updateAccount', {
      form: accountDetails,
    });
  }

  deleteAccount({ email, password }) {
    return this.apiClient.delete('/api/deleteAccount', {
      form: {
        email,
        password,
      },
    });
  }

  getUserDetailsByEmail(email) {
    return this.apiClient.get('/api/getUserDetailByEmail', {
      params: {
        email,
      },
    });
  }
}
