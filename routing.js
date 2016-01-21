//  ------- PRIVATE PROPERTIES ------
/**
Private Module Level Properties
- app: module level reference to the Server oject
*/
var app;
var admin_users;
var root_pkg = require('../../package');

/**
Configure Routes
dynamically sets up the routing for the app
loads configuration from provided endpoints
*/
function configureRoutes(endpoints, users){
  console.log("EZBake: adding ingredients");
  var endpoints = endpoints["endpoints"];

  for(var i=0; i<endpoints.length; i++){
    var entry = endpoints[i];
    var path = entry["path"];
    var methods = entry["methods"];
    var handler = entry["handler"];
    var isProtected = entry["protected"] || false;

    for (var j=0;j<methods.length; j++) {
      var method = methods[j];
      bindHandler(method, path, isProtected, handler)
    }

  }

  app.get("/info",function (req,res) {
    var i = {
      'name':root_pkg.name,
      'version':root_pkg.version,
      'description':root_pkg.description,
      'ezbake':root_pkg.dependencies.ezbake

    };
    res.send(i);
  });
}

/**
Bind Handler
a helper method that binds a handler to a method and path
- method: http method (get, post, put, delete)
- paths: root ur path
- handler: the name of the handler
*/
function bindHandler(method, path, isProtected, handler){

  var check = isProtected ? admin_check : skip_check;

  if(method === "get") {
    app.get(path, check, require(process.cwd()+handler));
    console.log("EZBake: route GET handler\t",path,"=>",handler+"() protected:",isProtected);
  }else if(method === "post"){
    app.post(path, check, require(process.cwd()+handler));
    console.log("EZBake: route POST hander\t",path,"=>",handler+"() protected:",isProtected);
  }else if(method === "put"){
    app.put(path, check, require(process.cwd()+handler));
    console.log("EZBake: route PUT hander\t",path,"=>",handler+"() protected:",isProtected);
  }else if(method === "delete"){
    app.delete(path, check, require(process.cwd()+handler));
    console.log("EZBake: route DELETE hander\t",path,"=>",handler+"() protected:",isProtected);
  }else{
    console.log("EZBake: routing failed: unknown HTTP Method:"+method);
  }
}
function skip_check(req, res, next){
  next();
}
function admin_check(req, res, next) {
  console.log(admin_users);
  var user = req.headers.user;
  var token = req.headers.token;
  if( token && user){
    var authenticated_user = admin_users[user];
    if(authenticated_user){
      if(authenticated_user.token === token){
        next();
      }else{
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  }else{
    res.sendStatus(401);
  }
}


//  ------- PUBLIC MODULE -------
module.exports = function(a, endpoints, users) {
  app = a
  admin_users = users;
  configureRoutes(endpoints);
}
module.exports.configureRoutes = configureRoutes;
