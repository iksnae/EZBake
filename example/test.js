var EZBake = require("ezbake");

var ez = new EZBake();
ez.loadEndpoints(require("./endpoints"))
ez.startServer()