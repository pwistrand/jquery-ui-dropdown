var express = require('express'),
    url = require('url'),
    app = express.createServer();
    
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});    
    
app.get('/', function(req, res) {        
    res.send('Hello World Express!');
});

app.listen(process.env.PORT, "0.0.0.0");
console.log('Express server started on port %s', app.address().port);