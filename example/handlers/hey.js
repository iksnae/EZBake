module.exports = function(req, res){
  var yourname = req.params.yourname;
  res.send("<p>Hey! "+yourname+"</p>");
}