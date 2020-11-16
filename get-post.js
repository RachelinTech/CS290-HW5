var express = require("express");
var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3925);

app.get("/",function(req,res){
	res.render("get_home");
});

app.post("/",function(req,res){
	res.render("post_home");
});

app.use(function(req,res){
	res.status("404");
	res.render("404");
});

app.listen(app.get("port"), function(){
  console.log("Express started on http://localhost:" + app.get("port") + ". press Ctrl+C to terminate.");
});