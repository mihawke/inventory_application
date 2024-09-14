#! /usr/bin/env node
require('dotenv').config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product VARCHAR ( 255 ),
  category VARCHAR ( 255 )
);

INSERT INTO products (product, category) VALUES
('Laptop', 'Electronics'),
('Smartphone', 'Electronics'),
('Headphones', 'Electronics'),
('Monitor', 'Electronics'),
('Keyboard', 'Electronics'),
('Mouse', 'Electronics'),
('Smartwatch', 'Electronics'),
('Tablet', 'Electronics'),
('Camera', 'Electronics'),
('Printer', 'Electronics'),

('Milk', 'Groceries'),
('Banana', 'Groceries'),
('Bread', 'Groceries'),
('Cheese', 'Groceries'),
('Eggs', 'Groceries'),
('Butter', 'Groceries'),
('Apples', 'Groceries'),
('Tomatoes', 'Groceries'),
('Chicken Breast', 'Groceries'),
('Orange Juice', 'Groceries'),

('Sofa', 'Furniture'),
('Dining Table', 'Furniture'),
('Chair', 'Furniture'),
('Bookshelf', 'Furniture'),
('Bed Frame', 'Furniture'),
('Wardrobe', 'Furniture'),
('Coffee Table', 'Furniture'),
('Nightstand', 'Furniture'),
('Desk', 'Furniture'),
('Armchair', 'Furniture'),

('T-Shirt', 'Clothing'),
('Jeans', 'Clothing'),
('Jacket', 'Clothing'),
('Sweater', 'Clothing'),
('Shoes', 'Clothing'),
('Hat', 'Clothing'),
('Scarf', 'Clothing'),
('Gloves', 'Clothing'),
('Socks', 'Clothing'),
('Belt', 'Clothing'),

('Toy Car', 'Toys'),
('Doll', 'Toys'),
('Puzzle', 'Toys'),
('Building Blocks', 'Toys'),
('Action Figure', 'Toys'),
('Board Game', 'Toys'),
('Stuffed Animal', 'Toys'),
('Train Set', 'Toys'),
('Yo-Yo', 'Toys'),
('Rubik’s Cube', 'Toys'),

('Soccer Ball', 'Sports Equipment'),
('Tennis Racket', 'Sports Equipment'),
('Basketball', 'Sports Equipment'),
('Baseball Glove', 'Sports Equipment'),
('Yoga Mat', 'Sports Equipment');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
