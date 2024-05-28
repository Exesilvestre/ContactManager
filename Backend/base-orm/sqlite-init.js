// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function CrearBaseSiNoExiste() {
  await db.open("./.data/contacts.db");
  //await db.open(process.env.base);

  let resp = null;

  resp = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'users'",
    []
  );
  (resp.contar > 0)? exist = true : exist = false;
  if (!exist) {
    await db.run(
      "CREATE table users( IdUser TEXT PRIMARY KEY, Username text NOT NULL UNIQUE, Passwd text NOT NULL);"
    );
    console.log("Users table created!");

    const saltRounds = 10;

    idUser = uuidv4()
    username = 'admin'
    passwd = '123'
    hashedPasswd = await bcrypt.hash(passwd, saltRounds);

    try {
      await db.run(`INSERT INTO users(IdUser, Username, Passwd) VALUES ("${idUser}", "${username}", "${hashedPasswd}")`);
      console.log('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  }
  exist = false;
  resp = null;

  resp = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'contacts'",
    []
  );
  (resp.contar > 0)? exist = true : exist = false;
  if (!exist) {
    await db.run(
    `CREATE table contacts( 
        IdContact TEXT PRIMARY KEY,
        UserId TEXT NOT NULL,
        Email TEXT NOT NULL,
        Title TEXT NOT NULL,
        Name text NOT NULL UNIQUE,
        Address Text NOT NULL,
        Cellphone INTEGER NOT NULL,
        ProfilePic TEXT NOT NULL,
        FOREIGN KEY (UserId) REFERENCES users(IdUser));`
    );
    console.log("Contacts table created!");
  }
  // cerrar la base
  await db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;