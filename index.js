var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));


var task = [];

var complete = [];

app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    n = newTask.split(';');
    n.forEach(element => {
        element = element.trim();
        if(element.length){
            task.push(element);
        }
    });

    // newTask = newTask.trim();
    // if(newTask.length){
    //     task.push(newTask);
    // }
    // else{
    //     console.log("enter something");
    // }
    res.redirect("/");
});

app.post("/donetask", function(req, res) {
    var completeTask = req.body.check;
    
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.post("/deletetask", function(req,res){
    complete = [];
    res.redirect("/");
})

app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});

app.listen(3000, function() {
    console.log("server is running on port 3000");
});