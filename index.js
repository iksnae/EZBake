var express = require('express');
var bodyParser = require('body-parser');
var Server = require('./server');


var EZBake = function(){
  var app;
  self = this;
  self.startServer = function(){
    console.log("running service");
    app.listen(self.port, self.ipaddress, function() {
      console.log('%s: service started on %s:%d ...', Date(Date.now() ), self.ipaddress, self.port);
    });
  }

  self.loadEndpoints = function(endpoints){
    console.log("initializing service");
    app = module.exports = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    require('./environment.js')(self, app, express);
    require('./routing.js')(app,endpoints);
  }
}

module.exports = EZBake;