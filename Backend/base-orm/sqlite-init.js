// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/contact.db");
  //await db.open(process.env.base);

  let resp = null;

  resp = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  (resp.contar > 0)? exist = true : exist = false;
  if (!exist) {
    await db.run(
      "CREATE table users( IdUser INTEGER PRIMARY KEY AUTOINCREMENT, User text NOT NULL UNIQUE, Passwd text NOT NULL);"
    );
    console.log("User table created!");
    await db.run(
      "insert into usuarios values	(1,'admin','123'),(2,'juan','123');"
    );
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
        Name text NOT NULL UNIQUE,
        Address Text NOT NULL,
        Cellphone INTEGER NOT NULL,
        ProfilePic INTEGER NOT NULL );`
    );
    console.log("Contacts table created!");
  }
  // cerrar la base
  await db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;