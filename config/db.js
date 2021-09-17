const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGODB_URI, connectionOptions)
  .then(() => {
    console.log("Connecté à MongoDB avec succèss :)");
  })
  .catch((e) => console.log("Erreur de connexion à MongoDB", e));



