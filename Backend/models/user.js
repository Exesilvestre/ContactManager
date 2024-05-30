'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Contact, { foreignKey: 'UserId' });
    }
  }
  User.init({
    IdUser: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,},
    Username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    Passwd: {
      type: DataTypes.TEXT,
      allowNull: false,
  },
  },{
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};