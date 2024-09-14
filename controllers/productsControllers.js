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
        const categories = await db.getOnlyCategoriesQuery();
        res.render('index', { products: products, categories: categories });
    },

    getOnlyCategories: async (req, res) => {
        const categories = await db.getOnlyCategoriesQuery();
        res.render('index', { categories: categories });
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
    }
};

module.exports = productsControllers;
