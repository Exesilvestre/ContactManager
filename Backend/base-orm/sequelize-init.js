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

// definir modelo de sesiones
const Session = sequelize.define("Session", {
    SessionId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'IdUser'
        }
    },
    CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
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

// Definir las relaciones entre los modelos
User.hasMany(Contact, { foreignKey: 'UserId' });
Contact.belongsTo(User, { foreignKey: 'UserId' });

User.hasMany(Session, { foreignKey: 'UserId' });
Session.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { User, Contact, Session };
