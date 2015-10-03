var express = require('express');
var bodyParser = require('body-parser');

//  ------- PUBLIC MODULE ------- 
/**
Buffer Server
responsible for setting up and running an express server
*/
var Server = function() {

  // local properties
  self = this;
  var app;

  /**
  Start
  starts the express server with environment variables
  */
  self.start = function(){
    console.log("starting Server");
    app.listen(self.port, self.ipaddress, function() {
      console.log('%s: Server started at %s:%d ...', Date(Date.now() ), self.ipaddress, self.port);
    });
  }

  /**
  Initialize
  setups up the server environment and routing
  */
  self.initialize = function(){
    console.log("initializing Server");
    app = module.exports = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    require('./environment.js')(self, app, express);
    require('./routing.js')(app);
  }
}

module.exports = Server;