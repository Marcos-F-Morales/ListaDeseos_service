const express = require('express');

class FavoritesRoute {
  constructor(app) {
    this.router = express.Router();
    this.registerMockRoutes();
    app.use("/favorites", this.router);
  }

  registerMockRoutes() {
    // Agregar favorito
    this.router.post("/", (req, res) => {
      res.json({
        message: "Producto agregado a favoritos",
        item: {
          user_id: req.body.user_id || "fake-user-123",
          producto_id: req.body.producto_id || 555
        }
      });
    });

    // Obtener favoritos
    this.router.get("/:user_id", (req, res) => {
      res.json([
        { producto_id: 111, nombre: "Zapatillas rojas" },
        { producto_id: 222, nombre: "Camisa azul" }
      ]);
    });

    // Eliminar favorito
    this.router.delete("/:user_id/:producto_id", (req, res) => {
      res.json({ message: `Producto ${req.params.producto_id} eliminado de favoritos` });
    });

    // Vaciar favoritos
    this.router.delete("/clear/:user_id", (req, res) => {
      res.json({ message: `Todos los favoritos del usuario ${req.params.user_id} fueron eliminados` });
    });
  }
}

module.exports = FavoritesRoute;
