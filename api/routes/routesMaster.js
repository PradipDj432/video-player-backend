const vedioRoutes = require("./vedioRoutes");
const userRoutes = require("./userRoutes");
const routesMaster = (app) => {
  app.use("/video", vedioRoutes);
  app.use("/user", userRoutes);
};

module.exports = routesMaster;
