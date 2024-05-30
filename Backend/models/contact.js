'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Contact.init({
    IdContact: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    Email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Cellphone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProfilePic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    UserId:{
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'IdUser'
      }
    },
  }, {
    sequelize,
    modelName: 'Contact',
    timestamps: false,
  });
  return Contact;
};