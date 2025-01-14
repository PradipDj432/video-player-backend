require("dotenv").config();
const express = require("express");
const routesMaster = require("./src/routes/routesMaster");
const configMaster = require("./src/config/configMaster");

const app = express();
app.use(express.json());

routesMaster(app);

configMaster.connectMongoDB();

app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
