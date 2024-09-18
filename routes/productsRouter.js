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

//Route to delete product
productRouter.get('/:id/delete', productsControllers.deleteProduct);

//Route to delete category
productRouter.get('/categories/:category/delete', productsControllers.deleteCategory);

//Route to create product
productRouter.get('/create', productsControllers.createProductGet);
productRouter.post('/create', productsControllers.createProductPost);

module.exports = productRouter;
