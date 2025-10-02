const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { APP_PORT, API_GATEWAY_URL } = require('./src/config/config.js');
const db = require('./src/models'); 

// Importamos las rutas
const ShoppingBagRoute = require('./src/routes/shoppingBag.route.js');
const FavoritesRoute = require('./src/routes/favorites.route.js');

class Server {
  constructor() {
    this.app = express();
    this.port = APP_PORT;

    // Middleware para parsear JSON
    this.app.use(express.json()); 

    this.configureMiddlewares();
    this.configureRoutes();
    this.connectDatabase();
  }

  configureMiddlewares() {
    this.app.use(cors({
      origin: API_GATEWAY_URL,
      credentials: true // Permitir cookies y credenciales
    }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  configureRoutes() {
    new ShoppingBagRoute(this.app);
    new FavoritesRoute(this.app);
  }

  async connectDatabase() {
    try {
      // Sincronizamos todos los modelos
      await db.sequelize.sync({ alter: true }); 
      console.log('Base de datos conectada y sincronizada.');

      // Mostramos nombres amigables de las tablas
      console.log('Tablas en la base de datos:');
      console.log('- favorites');     // corresponde a tu modelo Favorites
      console.log('- shoppingBag');   // corresponde a tu modelo ShoppingBag
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

// Inicializamos y arrancamos el servidor
const server = new Server();
server.start();
