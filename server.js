'use strict';

// Module dependencies.
var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
 app = express();


// Environments configuration
app.configure( function(){
    app.use(express.errorHandler());
    app.use(express.static(__dirname + '/public'));
});

app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());


// Bootstrap routes
app.use(app.router);

// Start server
var port = process.env.PORT || 3100;
app.listen(port, function () {
    console.log('listening on port %d in %s mode', port, app.get('env'));
});