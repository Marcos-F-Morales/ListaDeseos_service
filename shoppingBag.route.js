const express = require('express');

class ShoppingBagRoute {
  constructor(app) {
    this.router = express.Router();
    this.registerMockRoutes();
    app.use("/shopping-bag", this.router); // 🔹 más simple
  }

  registerMockRoutes() {
    // Simular agregar producto
    this.router.post("/", (req, res) => {
      res.json({
        message: "Producto agregado a la bolsa",
        item: {
          user_id: req.body.user_id || "fake-user-123",
          producto_talla_color_id: req.body.producto_talla_color_id || 99,
          cantidad: req.body.cantidad || 1
        }
      });
    });

    // Simular obtener bolsa de un usuario
    this.router.get("/:user_id", (req, res) => {
      res.json([
        { producto_talla_color_id: 101, cantidad: 2 },
        { producto_talla_color_id: 202, cantidad: 1 }
      ]);
    });

    // Simular actualizar producto
    this.router.put("/:user_id/:product_id", (req, res) => {
      res.json({
        message: "Cantidad actualizada",
        item: {
          producto_talla_color_id: req.params.product_id,
          cantidad: req.body.cantidad
        }
      });
    });

    // Simular eliminar producto
    this.router.delete("/:user_id/:producto_talla_color_id", (req, res) => {
      res.json({ message: "Producto eliminado de la bolsa" });
    });

    // Simular vaciar bolsa
    this.router.delete("/clear/:user_id", (req, res) => {
      res.json({ message: `Bolsa del usuario ${req.params.user_id} vaciada` });
    });
  }
}

module.exports = ShoppingBagRoute;
