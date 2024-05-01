const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/contacts.db");
const { v4: uuidv4 } = require('uuid');

// definir modelo de usuarios
const User = sequelize.define("User", {
    IdUser: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    Username: {
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

// defino modelo de contactos
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
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'IdUser'
    }
  },
},
{
    timestamps: false,
});

// Defino relaciones
User.hasMany(Contact, { foreignKey: 'UserId' });
Contact.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { User, Contact};
