let express = require("express");
let cors = require("cors");

const routes = require("./routes/rutas");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use("/api",cors(corsOptions), routes);

app.listen(8000, () => {
  console.log("SERVIDOR LISTO");
});
