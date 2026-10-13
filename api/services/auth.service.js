export class AuthService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  verifyLogin({ email, password }) {
    return this.apiClient.post('/api/verifyLogin', {
      form: {
        email,
        password,
      },
    });
  }

  verifyLoginWihtouEmail(password) {
    return this.apiClient.post('/api/verifyLogin', {
      form: {
        password,
      },
    });
  }

  deleteVerifyLogin() {
    return this.apiClient.delete('/api/verifyLogin');
  }
}
