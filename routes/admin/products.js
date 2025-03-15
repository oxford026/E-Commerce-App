const express = require('express');
const productsRepo = require('../../repositories/products');
const productsIndexTemplate = require('../../views/admin/products/index');

const router = express.Router();


router.get('/admin/product', (req, res) => {

});

router.get('/admin/products/new', (req, res) => {

});

module.exports = router;