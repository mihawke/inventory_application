const express = require('express');
const productsControllers = require('../controllers/productsControllers');

const productRouter = express.Router();

// Route to get all products with categories
productRouter.get('/', productsControllers.getAllProducts);

// Route to get only products
productRouter.get('/products', productsControllers.getOnlyProducts);

// Route to get only categories
productRouter.get('/categories', productsControllers.getOnlyCategories);

// Route to filter products by category
productRouter.post('/', productsControllers.filterProducts);

// Routes to update a product (GET and POST)
productRouter.get('/:id/update', productsControllers.updateProductGet);
productRouter.post('/:id/update', productsControllers.updateProductPost);

module.exports = productRouter;
