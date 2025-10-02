const db = require("../models");
const ShoppingBag = db.models.ShoppingBag; // usa db.models para consistencia

class ShoppingBagController {
  // Agregar producto a la bolsa
  async addToBag(req, res) {
    try {
      const { user_id, producto_talla_color_id, cantidad } = req.body;

      const existingItem = await ShoppingBag.findOne({
        where: { user_id, producto_talla_color_id },
      });

      if (existingItem) {
        existingItem.cantidad += cantidad || 1;
        await existingItem.save();
        return res.json({ message: "Cantidad actualizada en la bolsa", item: existingItem });
      }

      const newItem = await ShoppingBag.create({
        user_id,
        producto_talla_color_id,
        cantidad: cantidad || 1,
      });

      res.json({ message: "Producto agregado a la bolsa", item: newItem });
    } catch (err) {
      console.error("Error al agregar producto a la bolsa:", err);
      res.status(500).json({ error: "Error al agregar producto a la bolsa" });
    }
  }

  // Obtener bolsa de un usuario
  async getBagByUser(req, res) {
    try {
      const { user_id } = req.params;
      const bag = await ShoppingBag.findAll({ where: { user_id } });
      res.json(bag);
    } catch (err) {
      console.error("Error al obtener bolsa del usuario:", err);
      res.status(500).json({ error: "Error al obtener bolsa del usuario" });
    }
  }

  // Actualizar cantidad de un producto
  async updateBagItem(req, res) {
    try {
      const { user_id, producto_talla_color_id } = req.params;
      const { cantidad } = req.body;

      const item = await ShoppingBag.findOne({
        where: { user_id, producto_talla_color_id },
      });

      if (!item) {
        return res.status(404).json({ error: "Producto no encontrado en la bolsa" });
      }

      item.cantidad = cantidad;
      await item.save();

      res.json({ message: "Cantidad actualizada en la bolsa", item });
    } catch (err) {
      console.error("Error al actualizar producto en la bolsa:", err);
      res.status(500).json({ error: "Error al actualizar producto en la bolsa" });
    }
  }

  // Eliminar producto de la bolsa
  async removeFromBag(req, res) {
    try {
      const { user_id, producto_talla_color_id } = req.params;

      const deleted = await ShoppingBag.destroy({
        where: { user_id, producto_talla_color_id },
      });

      if (!deleted) {
        return res.status(404).json({ error: "Producto no encontrado en la bolsa" });
      }

      res.json({ message: "Producto eliminado de la bolsa" });
    } catch (err) {
      console.error("Error al eliminar producto de la bolsa:", err);
      res.status(500).json({ error: "Error al eliminar producto de la bolsa" });
    }
  }

  // Vaciar bolsa completa
  async clearBag(req, res) {
    try {
      const { user_id } = req.params;
      await ShoppingBag.destroy({ where: { user_id } });
      res.json({ message: "Bolsa vaciada correctamente" });
    } catch (err) {
      console.error("Error al limpiar bolsa:", err);
      res.status(500).json({ error: "Error al limpiar bolsa" });
    }
  }
}

module.exports = ShoppingBagController; // exporta la clase, no la instancia
