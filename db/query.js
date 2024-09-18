const pool = require("./pool");

//Read query
async function getAllProductsQuery() {
    const { rows } = await pool.query(`SELECT * FROM products ORDER BY id;`)
    return rows;
}

//Read query
async function getOnlyProductsQuery() {
    const { rows } = await pool.query(`SELECT product FROM products;`)
    return rows;
}

//Read query
async function getOnlyCategoriesQuery() {
    const { rows } = await pool.query(`SELECT DISTINCT category FROM products;`)
    return rows;
}

//Read query
async function getFilteredProducts(category) {
    let query = 'SELECT * FROM products';
    if (category) {
        query += ` WHERE category='${category}'`;
    }
    const { rows } = await pool.query(query)
    return rows;
}

//Read query
async function getProductById(productId) {
    const { rows } = await pool.query(`SELECT * FROM products WHERE id = ${productId}`)
    return rows;
}

//Update query
async function updateProduct(productId, updatedData) {
    // Build the SET clause dynamically based on updatedData
    const setClause = Object.keys(updatedData)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ');

    // Build the values array
    const values = Object.values(updatedData);

    // Add the productId to the values array
    values.push(productId);

    // Execute the update query with parameterized values
    const query = `
        UPDATE products
        SET ${setClause}
        WHERE id = $${values.length}
    `;

    try {
        const { rowCount } = await pool.query(query, values);
        return rowCount > 0; // Returns true if the update was successful
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

//Create query
async function createProductQuery(product, category) {
    const query = `INSERT INTO products (product , category) VALUES ($1,$2)`;  // Use parameterized query
    try {
        const result = await pool.query(query, [product,category]); // Execute the query
        console.log(`Created ${result.rowCount} product(s)`); // Log how many rows were deleted
    } catch (error) {
        console.error('Error creating product:', error); // Handle errors
        throw error;
    }
}

//Delete query
async function deleteProductQuery(productId) {
    const query = `DELETE FROM products WHERE id = $1`;  // Use parameterized query
    try {
        const result = await pool.query(query, [productId]); // Execute the query
        console.log(`Deleted ${result.rowCount} product(s)`); // Log how many rows were deleted
        return result;
    } catch (error) {
        console.error('Error deleting product:', error); // Handle errors
        throw error;
    }
}
//Delete Category query
async function deleteCategoryQuery(category) {
    const query = `DELETE FROM products WHERE category = $1`;  // Use parameterized query
    console.log(query)
    try {
        const result = await pool.query(query, [category]); // Execute the query
        console.log(`Deleted ${result.rowCount} product(s)`); // Log how many rows were deleted
        return result;
    } catch (error) {
        console.error('Error deleting product:', error); // Handle errors
        throw error;
    }
}

module.exports = {
    getAllProductsQuery,
    getOnlyProductsQuery,
    getOnlyCategoriesQuery,
    getFilteredProducts,
    getProductById,
    updateProduct,
    deleteProductQuery,
    createProductQuery,
    deleteCategoryQuery
}