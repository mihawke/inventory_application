const pool = require("./pool");

async function getAllProductsQuery() {
    const { rows } = await pool.query(`SELECT * FROM products ORDER BY id;`)
    return rows;
}

async function getOnlyProductsQuery() {
    const { rows } = await pool.query(`SELECT product FROM products;`)
    return rows;
}

async function getOnlyCategoriesQuery() {
    const { rows } = await pool.query(`SELECT DISTINCT category FROM products;`)
    return rows;
}

async function getFilteredProducts(category) {
    let query = 'SELECT * FROM products';
    if (category) {
        query += ` WHERE category='${category}'`;
    }
    const { rows } = await pool.query(query)
    return rows;
}

async function getProductById(productId) {
    const { rows } = await pool.query(`SELECT * FROM products WHERE id = ${productId}`)
    return rows;
}

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

module.exports = {
    getAllProductsQuery,
    getOnlyProductsQuery,
    getOnlyCategoriesQuery,
    getFilteredProducts,
    getProductById,
    updateProduct
}