var express = require('express');
var bodyParser = require('body-parser');
var Server = require('./server');


var EZBake = function(){
  var app;
  self = this;
  self.startServer = function(){
    console.log("EZBake: popping into the oven");
    app.listen(self.port, self.ipaddress, function() {
      var url = self.ipaddress || "http://localhost:";
      var now = new Date();
      console.log("EZBake: baking... since " + now + "\t@ " + url + self.port);
    });
  }

  self.loadEndpoints = function(endpoints){
    console.log("EZBake: gathering ingredients");
    app = module.exports = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    require('./environment.js')(self, app, express);
    require('./routing.js')(app,endpoints);
    console.log("EZBake: mixed ingredients. ready to bake.");
  }
}

module.exports = EZBake;