// index.js
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize({
  database: dbConfig.DB,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  },
  logging: false
});

// Importar modelos
const ShoppingBag = require('./Shoppingbag.js')(sequelize); // si lo usas
const Favorites = require('./favorites.js')(sequelize);

// Exportar con db.models para consistencia
const db = {
  sequelize,
  Sequelize,
  models: {
    ShoppingBag,
    Favorites
  }
};

module.exports = db;
