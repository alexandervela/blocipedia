const staticRoutes = require("../routes/static");
const userRoutes = require("../routes/users");

module.exports = {
    init(app){
      app.use(staticRoutes);
      app.use(userRoutes);
    }
  }