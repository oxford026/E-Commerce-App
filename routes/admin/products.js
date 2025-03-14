const express = require('express');
const { validationResult } = require('express-validator');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const router = express.Router();
const { requireTitle, requirePrice } = require('./validators');

router.get('/admin/product', (req, res) => {



});

router.get('/admin/products/new', (req, res) => {


    res.send(productsNewTemplate({}));

});

router.post('/admin/products/new', 
    [requireTitle, 
    requirePrice], 
    
    (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    res.send('submitted');
});

module.exports = router;