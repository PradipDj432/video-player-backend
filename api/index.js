require("dotenv").config();
const express = require("express");

const routesMaster = require("./routes/routesMaster");
const configMaster = require("./config/configMaster");
const cors = require("cors");
//https://video-player-frontend-ivory.vercel.app
const corsOptions = {
  origin: [
    "https://video-player-frontend-ivory.vercel.app",
    "http://localhost:3001",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
routesMaster(app);

configMaster.connectMongoDB();

app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
