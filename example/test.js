var EZBake = require("../index");

var ez = new EZBake();
ez.loadEndpoints(require("./endpoints"))
ez.startServer()