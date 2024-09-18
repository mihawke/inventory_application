const db = require('../db/query');

const productsControllers = {
    getAllProducts: async (req, res) => {
        const category = '';
        const products = await db.getAllProductsQuery();
        const categories = await db.getOnlyCategoriesQuery();
        res.render('index', { products: products, categories: categories, category: category });
    },

    getOnlyProducts: async (req, res) => {
        const products = await db.getOnlyProductsQuery();
        res.render('products', { products: products});
    },

    getOnlyCategories: async (req, res) => {
        const categories = await db.getOnlyCategoriesQuery();
        res.render('categories', { categories: categories });
    },

    filterProducts: async (req, res) => {
        const category = req.body.category || '';
        const products = await db.getFilteredProducts(category);
        const categories = await db.getOnlyCategoriesQuery();
        res.render('index', { products: products, categories: categories, category: category });
    },

    updateProductGet: async (req, res) => {
        const productId = req.params.id;
        const product = await db.getProductById(productId);
        const categories = await db.getOnlyCategoriesQuery();
        res.render('update', { product: product, categories: categories, productId: productId });
    },
    updateProductPost: async (req, res) => {
        try {
            const productId = req.params.id;
            const updatedData = req.body; // Contains the updated product data

            await db.updateProduct(productId, updatedData);

            // Redirect to the updated product list or another appropriate page
            res.redirect('/');
        } catch (error) {
            console.error('Error in updateProductPost:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            await db.deleteProductQuery(productId);
            // Redirect to the updated product list or another appropriate page
            res.redirect('/');
        } catch (error) {
            console.error('Error in deleteProduct:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    createProductGet: async (req, res) => {
        try {
            const categories = await db.getOnlyCategoriesQuery();
            res.render('create',{categories: categories});
        } catch (error) {
            console.error('Error in createProduct:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    createProductPost: async (req, res) => {
        try {
            const {product,category} = req.body;
            console.log(`${product} , ${category}`)
            await db.createProductQuery(product,category);
            res.redirect('/');
        } catch (error) {
            console.error('Error in createProduct:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    deleteCategory: async (req,res) => {
        try {
            const category = req.params.category;
            console.log(`Deleting category: ${category}`);
            await db.deleteCategoryQuery(category);
            res.redirect('/')
        } catch (error) {
            console.error('Error in deleteCategory:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = productsControllers;
