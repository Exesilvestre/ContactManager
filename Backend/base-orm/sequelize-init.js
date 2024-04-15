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
}
);

// Definir la relación entre User y Contact
User.hasMany(Contact, { foreignKey: 'UserId' });
Contact.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { User, Contact };