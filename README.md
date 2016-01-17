# EZBake

[![npm version](https://badge.fury.io/js/ezbake.svg)](https://badge.fury.io/js/ezbake)
![status.png](https://magnum-ci.com/status/609f9152d8b9fb53a2bdc2eb780a3634.png)

simplifies building a service

Built atop express.js, EZBake provides a convenient approach to building webservices. 

## Installation

```
npm install ezbake -S
```

## Usage

With EZBake you define your endpoints in a JSON file like so:
``` json
{
    "endpoints": [
        {
            "path": "/",
            "methods": [
                "get"
            ],
            "handler": "/handlers/root"
        }
    ]
}
```
Note the ```handler``` is set to ```/handlers/root```. This points to a designated request handling module in the project. In this case it's in a directory called ```handlers```. Here's what root.js handler looks like:

``` js
module.exports = function(req, res){
  res.send("<p>Hello World</p>");
}
```
Now it's time to do some baking. In our application we load the EZBake module via ```require("ezbake")```, create a instance, load up our endpoint and start the server.

```js
var EZBake = require("ezbake");

var ez = new EZBake();
ez.loadEndpoints(require("./endpoints"))
ez.startServer()
```

That's it. You just need to run the app from your terminal:

```shell

node app

```
and you should see something like this:

```shell

initializing service
configuring localhost environment
route GET handler	 / => /handlers/root()
running service
server started on %s:%d, Sat Oct 03 2015 12:15:30 GMT-0700 (PDT)	@ http://localhost::8000

```
Your service is running and and can be accessed via your browser.


The source code for this can be found in ```/example``` directory of the project.
