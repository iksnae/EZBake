//  ------- PRIVATE PROPERTIES ------
/**
Private Module Level Properties
- app: module level reference to the Server oject
*/
var app;

/**
Configure Routes
dynamically sets up the routing for the app
loads configuration from provided endpoints
*/
function configureRoutes(endpoints){
  console.log("EZBake: adding ingredients");
  var endpoints = endpoints["endpoints"];
  for(var i=0; i<endpoints.length; i++){
    var entry = endpoints[i];
    var path = entry["path"];
    var methods = entry["methods"];
    var handler = entry["handler"];
    for (var j=0;j<methods.length; j++) {
      var method = methods[j];
      bindHandler(method, path, handler)
    }

  }
}

/**
Bind Handler
a helper method that binds a handler to a method and path
- method: http method (get, post, put, delete)
- paths: root ur path
- handler: the name of the handler
*/
function bindHandler(method, path, handler){
  if(method === "get") {
    app.get(path, require(process.cwd()+handler));
    console.log("EZBake: route GET handler\t",path,"=>",handler+"()");
  }else if(method === "post"){
    app.post(path, require(process.cwd()+handler));
    console.log("EZBake: route POST hander\t",path,"=>",handler+"()");
  }else if(method === "put"){
    app.post(path, require(process.cwd()+handler));
    console.log("EZBake: route PUT hander\t",path,"=>",handler+"()");
  }else if(method === "delete"){
    app.post(path, require(process.cwd()+handler));
    console.log("EZBake: route DELETE hander\t",path,"=>",handler+"()");
  }else{
    console.log("EZBake: routing failed: unknown HTTP Method:"+method);
  }
}

//  ------- PUBLIC MODULE ------- 
module.exports = function(a, endpoints) {
  app = a
  configureRoutes(endpoints);
}
