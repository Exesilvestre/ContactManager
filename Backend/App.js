const express = require("express");
const cors = require("cors"); 
const bcrypt = require('bcrypt');

require("./base-orm/sqlite-init");

// create server
const app = express();
app.use(express.json());
app.use(cors());

const usersRouter = require("./routes/users");
app.use(usersRouter);

const contactsRouter = require("./routes/contacts");
app.use(contactsRouter);

const sessionsRouter = require("./routes/sessions");
app.use(sessionsRouter);

// start server
if (!module.parent) {
  const port = process.env.PORT || 4000;   
  app.listen(port, () => {
    console.log(`site listening port: ${port}`);
  });
}
module.exports = app; 




