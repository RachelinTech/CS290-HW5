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
	queryList = [];
	for (var q in req.query){
		queryList.push({"query":q, "value":req.query[q]})
	}
	var context = {};
	context.queryList = queryList;
	res.render("get_table", context);
});

app.post("/",function(req,res){
	queryList = [];
	bodyList = [];
	for (var i in req.query){
		queryList.push({"query":i, "value":req.query[i]})
	}
	for (var i in req.body){
		bodyList.push({"bodyItem":i, "bodyValue":req.body[i]})
	}
	var context = {};
	context.queryList = queryList;
	context.bodyList = bodyList;
	res.render("post_table", context);
});

app.use(function(req,res){
	res.status("404");
	res.render("404");
});

app.listen(app.get("port"), function(){
  console.log("Express started on http://localhost:" + app.get("port") + ". press Ctrl+C to terminate.");
});