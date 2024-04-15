// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");
const { v4: uuidv4 } = require('uuid');

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/contact.db");
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
    console.log("User table created!");
    await db.run(
        "INSERT INTO users(IdUser, Username, Passwd) VALUES (?, ?, ?)",
        [uuidv4(), 'admin', '123'])
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
        IdContact INTEGER PRIMARY KEY AUTOINCREMENT,
        UserId TEXT NOT NULL,
        Name text NOT NULL UNIQUE,
        Address Text NOT NULL,
        Cellphone INTEGER NOT NULL,
        ProfilePic INTEGER NOT NULL,
        FOREIGN KEY (UserId) REFERENCES users(IdUser));`
    );
    console.log("Contacts table created!");
  }
  // cerrar la base
  await db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;