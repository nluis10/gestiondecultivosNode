const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const routes = require("./routes/rutas");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

const jsonParser = bodyParser.json()

app.use("/api", cors(corsOptions), jsonParser, routes);

app.listen(8000, () => {
  console.log("SERVIDOR LISTO");
});
