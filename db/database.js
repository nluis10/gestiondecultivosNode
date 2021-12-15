const mongoose = require("mongoose");

const userDB = 'nluis10'
const passwordDB = 'pe9icBsVawSvABBq'
const nameBD = 'cultivos'
const uriDB = `mongodb+srv://${userDB}:${passwordDB}@servermongo.c8zfh.mongodb.net/${nameBD}?retryWrites=true&w=majority`

mongoose
  .connect(uriDB)
  .then(() => {
    console.log("Conexion a la base de datos");
  })
  .catch((e) => {
    console.log("Error Bd: ", e);
  });

module.exports = mongoose;