export class ApiClient {
  constructor(requestContext) {
    this.requestContext = requestContext;
  }

  async request(method, endpoint, options = {}) {
    return this.requestContext.fetch(endpoint, {
      ...options,
      method,
    });
  }

  async get(endpoint, options = {}) {
    return this.request('GET', endpoint, options);
  }

  async post(endpoint, options = {}) {
    return this.request('POST', endpoint, options);
  }

  async put(endpoint, options = {}) {
    return this.request('PUT', endpoint, options);
  }

  async delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, options);
  }
}
