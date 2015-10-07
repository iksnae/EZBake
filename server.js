var express = require('express');
var bodyParser = require('body-parser');

//  ------- PUBLIC MODULE ------- 
/**
Server
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
    console.log("EZBake: starting Server");
    app.listen(self.port, self.ipaddress, function() {
      console.log('EZBake: started at', Date(Date.now() ), self.ipaddress, self.port);
    });
  }

  /**
  Initialize
  setups up the server environment and routing
  */
  self.initialize = function(){
    console.log("EZBake: initializing Server");
    app = module.exports = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    require('./environment.js')(self, app, express);
    require('./routing.js')(app);
  }
}

module.exports = Server;
