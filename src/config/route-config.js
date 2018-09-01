const staticRoutes = require("../routes/static");
const userRoutes = require("../routes/users");
const wikiRoutes = require("../routes/wikis");

module.exports = {
    init(app){
      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(wikiRoutes);
    }
  }