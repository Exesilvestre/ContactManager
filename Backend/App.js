const express = require("express");
const cors = require("cors"); 
const config = require("./config/app"); 



// create server
const app = express();
app.use(express.json());
app.use(cors());

const usersRouter = require("./routes/auth");
app.use(usersRouter);

const contactsRouter = require("./routes/contacts");
app.use(contactsRouter);

// start server
if (!module.parent) {
  const port =  config.port; 
  app.listen(port, () => {
    console.log(`site listening port: ${port}`);
  });
}
module.exports = app; 




