const mysql = require('mysql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Existing database connection
const oldDb = mysql.createConnection({
  host: 'old-db-host',
  user: 'old-db-user',
  password: 'old-db-password',
  database: 'old-db-name',
});

// New database connection
const newDb = mongoose.createConnection('mongodb://new-db-host:27017/new-db-name');

// Migrate users
oldDb.query('SELECT * FROM users', (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }

  const users = rows.map((row) => {
    return {
      email: row.email,
      password: bcrypt.hashSync(row.password, 10),
      name: row.name,
      // ...
    };
  });

  newDb.collection('users').insertMany(users, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Inserted ${result.insertedCount} users`);
  });
});

// Migrate products
oldDb.query('SELECT * FROM products', (err, rows) => {
  if (err){
    console.error(err);
    return;
  }

  const products = rows.map((row) => {
    return {
      name: row.name,
      description: row.description,
      price: row.price,
      image: row.image,
      // ...
    };
  });

  newDb.collection('products').insertMany(products, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Inserted ${result.insertedCount} products`);
  });
});

// Migrate orders
oldDb.query('SELECT * FROM orders', (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }

  const orders = rows.map((row) => {
    return {
      userId: row.user_id,
      productId: row.product_id,
      quantity: row.quantity,
      // ...
    };
  });

  newDb.collection('orders').insertMany(orders, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Inserted ${result.insertedCount} orders`);
  });
});

// Close database connections
oldDb.end();
newDb.close();
