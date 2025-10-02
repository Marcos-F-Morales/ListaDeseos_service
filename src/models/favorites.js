// favorites.js
const { DataTypes, Model } = require('sequelize');

class Favorites extends Model {}

module.exports = (sequelize) => {
  Favorites.init(
    {
      userUUID: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id'
      },
      productVariant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'producto_talla_color_id'
      },
      token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        field: 'share_id'
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'share_expires_at'
      },
      sharedFlag: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_shared'
      }
    },
    {
      sequelize,
      modelName: 'Favorites',
      tableName: 'wishlists',
      underscored: true,
      timestamps: true
    }
  );

  return Favorites;
};
