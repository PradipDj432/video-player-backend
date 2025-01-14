const vedioRoutes = require("./vedioRoutes");

const routesMaster = (app) => {
  app.use("/video", vedioRoutes);
};

module.exports = routesMaster;
