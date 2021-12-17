const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
require('dotenv').config()

const routes = require("./routes/rutas");

const app = express();
const port = process.env.PORT
const corsOptions = {
  origin: "http://localhost:3000",
};

const jsonParser = bodyParser.json()

app.use("/api", cors(corsOptions), jsonParser, routes);

app.listen(port, () => {
  console.log("SERVIDOR LISTO");
});
