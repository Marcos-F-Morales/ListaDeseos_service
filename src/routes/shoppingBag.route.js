const express = require("express");
const ShoppingBagController = require("../controllers/shoppingBag.controller.js");

class ShoppingBagRoute {
  constructor(app) {
    this.router = express.Router();
    this.controller = new ShoppingBagController(); // instancia correctamente la clase
    this.registerRoutes();
    app.use("/shopping-bag", this.router);
  }

  registerRoutes() {
    this.router.delete("/clear/:user_id", (req, res) => {
      try {
        this.controller.clearBag(req, res);
      } catch (err) {
        console.error("Error al limpiar la bolsa del usuario: ", err);
      }
    });

    this.router.post("/", (req, res) => {
      try {
        this.controller.addToBag(req, res);
      } catch (err) {
        console.error("Error al agregar producto a la bolsa: ", err);
      }
    });

    this.router.get("/:user_id", (req, res) => {
      try {
        this.controller.getBagByUser(req, res);
      } catch (err) {
        console.error("Error al obtener la bolsa del usuario: ", err);
      }
    });

    this.router.put("/:user_id/:producto_talla_color_id", (req, res) => {
      try {
        this.controller.updateBagItem(req, res);
      } catch (err) {
        console.error("Error al actualizar producto de la bolsa: ", err);
      }
    });

    this.router.delete("/:user_id/:producto_talla_color_id", (req, res) => {
      try {
        this.controller.removeFromBag(req, res);
      } catch (err) {
        console.error("Error al eliminar producto de la bolsa: ", err);
      }
    });
  }
}

module.exports = ShoppingBagRoute;
