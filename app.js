//Sarah Botwinick 


var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var idCounter = 1;

var app = express();

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  console.log("a");
  res.render("index");
  
  

});

app.get("/new-entry", function(req, res) {
  console.log("b");

  res.render("index");
  
});

app.post("/add", function(req, res) {
  console.log("c");



  entries.push({
    description: req.body.description,
    date: req.body.date,
    type: req.body.type,
    id: idCounter,
  });
  idCounter++;
  res.redirect("/");
});

app.post("/delete", function(req, res) {
  console.log("remove!");
  if(req.body.entry){
    console.log("has entry");


    var passType = typeof(req.body.entry);
    var removeList = [];
	
		if(passType != 'string'){
		
			var length = req.body.entry.length;
			for(var i = 0; i < length; i++){
        removeList[i] = req.body.entry[i];
        console.log("removing lots");
			}
    }
    else{
    length = 1;
    removeList[0] = req.body.entry;
    console.log("removing one");

  }

 for(var y = 0; y<length; y++){
  for(var q = 0; q < entries.length; q++){
    if(removeList[y] == entries[q].id){
      entries.splice(q, 1);
      break;
    }
  }
 }
}
  res.redirect("/");

});

app.use(function(req, res) {
  console.log("d");

  res.status(404).render("404");
});

http.createServer(app).listen(3000, function() {
  console.log("Task manager app started.");
});
