export class ProductsService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getProductsList() {
    return this.apiClient.get('/api/productsList');
  }

  postProductsList() {
    return this.apiClient.post('/api/productsList');
  }

  getBrandsList() {
    return this.apiClient.get('/api/brandsList');
  }

  putBrandsList() {
    return this.apiClient.put('/api/brandsList');
  }

  searchProducts(searchProduct) {
    return this.apiClient.post('/api/searchProduct', {
      form: {
        search_product: searchProduct,
      },
    });
  }
  searchProductsWithoutParameter() {
    return this.apiClient.post('/api/searchProduct');
  }
}
