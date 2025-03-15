const Repository = require('./repository');

class ProductsRepository extends Repository {

}

module.exports = new ProductsRepository('products.json');
// Compare this snippet from repositories/products.js: