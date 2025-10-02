const db = require("../models");
const Favorites = db.models.Favorites;
const { genShareId } = require("../middleware/generatorId.js");

class FavoritesController {
  // Agregar producto a favoritos
  async addToFavorites(req, res) {
    try {
      const { user_id, producto_talla_color_id } = req.body;

      const existingItem = await Favorites.findOne({
        where: { user_id, producto_talla_color_id },
      });

      if (existingItem) {
        return res.json({ message: "El producto ya está en favoritos", item: existingItem });
      }

      const newItem = await Favorites.create({ user_id, producto_talla_color_id });
      res.json({ message: "Producto agregado a favoritos", item: newItem });
    } catch (err) {
      console.error("Error al agregar producto a favoritos:", err);
      res.status(500).json({ error: "Error al agregar producto a favoritos" });
    }
  }

  // Obtener favoritos de un usuario
  async getFavoritesByUser(req, res) {
    try {
      const { user_id } = req.params;
      const list = await Favorites.findAll({ where: { user_id } });
      res.json(list);
    } catch (err) {
      console.error("Error al obtener favoritos:", err);
      res.status(500).json({ error: "Error al obtener favoritos" });
    }
  }

  // Eliminar un producto de favoritos
  async removeFromFavorites(req, res) {
    try {
      const { user_id, producto_talla_color_id } = req.params;

      const deleted = await Favorites.destroy({
        where: { user_id, producto_talla_color_id },
      });

      if (!deleted) {
        return res.status(404).json({ error: "Producto no encontrado en favoritos" });
      }

      res.json({ message: "Producto eliminado de favoritos" });
    } catch (err) {
      console.error("Error al eliminar de favoritos:", err);
      res.status(500).json({ error: "Error al eliminar de favoritos" });
    }
  }

  // Vaciar lista completa
  async clearFavorites(req, res) {
    try {
      const { user_id } = req.params;
      await Favorites.destroy({ where: { user_id } });
      res.json({ message: "Lista de favoritos vaciada correctamente" });
    } catch (err) {
      console.error("Error al limpiar favoritos:", err);
      res.status(500).json({ error: "Error al limpiar favoritos" });
    }
  }

  // Generar link para compartir
  async postUrlShare(req, res) {
    try {
      const { userId } = req.params;

      const shareId = genShareId();
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 1); // expira en 1 día

      await Favorites.update(
        { is_shared: true, share_id: shareId, share_expires_at: expiration },
        { where: { user_id: userId } }
      );

      res.json({ message: "Lista compartida", shareId });
    } catch (err) {
      console.error("Error al compartir favoritos:", err);
      res.status(500).json({ error: "Error al compartir favoritos" });
    }
  }

  // Revocar link compartido
  async revokeShareLink(req, res) {
    try {
      const { userId } = req.params;

      await Favorites.update(
        { is_shared: false, share_id: null, share_expires_at: null },
        { where: { user_id: userId } }
      );

      res.json({ message: "Link de favoritos revocado" });
    } catch (err) {
      console.error("Error al revocar link de favoritos:", err);
      res.status(500).json({ error: "Error al revocar link de favoritos" });
    }
  }

  // Obtener lista compartida públicamente
  async getSharedFavoritesPublic(req, res) {
    try {
      const { shareId } = req.params;

      const items = await Favorites.findAll({ where: { share_id: shareId, is_shared: true } });

      if (!items || items.length === 0) {
        return res.status(404).json({ error: "Lista no encontrada o expirada" });
      }

      res.json(items);
    } catch (err) {
      console.error("Error al obtener favoritos compartidos:", err);
      res.status(500).json({ error: "Error al obtener favoritos compartidos" });
    }
  }
}

module.exports = FavoritesController;
