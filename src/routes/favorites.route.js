const express = require('express');
const FavoritesController = require('../controllers/favorites.controller');

class FavoritesRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new FavoritesController();
    this.registerRoutes();
    app.use("/favorites", this.router); // Ajusté la ruta base
  }

  registerRoutes() {
    // Vaciar lista de favoritos
    this.router.delete("/clear/:user_id", (req, res) => {
      try {
        this.controller.clearFavorites(req, res);
      } catch (err) {
        console.error("Error al limpiar la lista de favoritos del usuario:  ", err);
      }
    });

    // Agregar producto a favoritos
    this.router.post("/", (req, res) => {
      try {
        this.controller.addToFavorites(req, res);
      } catch (err) {
        console.error("Error al agregar un producto a favoritos:  ", err);
      }
    });

    // Obtener lista de favoritos de un usuario
    this.router.get("/:user_id", (req, res) => {
      try {
        this.controller.getFavoritesByUser(req, res);
      } catch (err) {
        console.error("Error al obtener la lista de favoritos del usuario:  ", err);
      }
    });

    // Eliminar producto específico de favoritos
    this.router.delete("/:user_id/:producto_talla_color_id", (req, res) => {
      try {
        this.controller.removeFromFavorites(req, res);
      } catch (err) {
        console.error("Error al eliminar un producto de favoritos:  ", err);
      }
    });

    // Compartir lista de favoritos
    this.router.post("/share/:userId", (req, res) => {
      try {
        this.controller.postUrlShare(req, res);
      } catch (err) {
        console.error("Error al compartir favoritos:  ", err);
      }
    });

    // Revocar link compartido
    this.router.post("/revoke/:userId", (req, res) => {
      try {
        this.controller.revokeShareLink(req, res);
      } catch (err) {
        console.error("Error al revocar link de favoritos:  ", err);
      }
    });

    // Obtener lista compartida públicamente
    this.router.get("/shared/:shareId", (req, res) => {
      try {
        this.controller.getSharedFavoritesPublic(req, res);
      } catch (err) {
        console.error("Error al obtener favoritos compartidos públicamente:  ", err);
      }
    });
  }
}

module.exports = FavoritesRoute;
