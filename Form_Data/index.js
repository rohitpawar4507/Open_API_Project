var express = require('express');

var app = express();

app.get('/register', function(req, res){
    res.sendFile(__dirname+ "/register.html");
});

app.get('/form-submit', function(req, res){
    res.send(req.query);
});


app.listen(3000);