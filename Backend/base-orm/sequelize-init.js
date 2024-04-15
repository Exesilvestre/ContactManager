// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/contacts.db");

// definir modelo de usuarios
const User = sequelize.define("User", {
  IdUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  User: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  Passwd: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
{
    timestamps: false,
});

// definir modelo de contactos
const Contact = sequelize.define("Contact", {
  IdContact: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
    timestamps: false,
}
);

module.exports = { User, Contact };