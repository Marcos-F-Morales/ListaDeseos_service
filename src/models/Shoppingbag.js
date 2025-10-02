// shoppingBag.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ShoppingBag = sequelize.define(
    'ShoppingBag',
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id'
      },
      productVariantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'producto_talla_color_id'
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: { min: 1 }
      }
    },
    {
      tableName: 'favorites', // sigue apuntando a la misma tabla
      freezeTableName: true,
      timestamps: false
    }
  );

  return ShoppingBag;
};
