
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./server/routes')
  , models = require('./server/models')
  , http = require('http')
  , nconf = require('nconf')
  , path = require('path')
  , mongoose = require('mongoose');


var app = express();

var angularBridge = new (require('angular-bridge'))(app, {
    urlPrefix : '/api/'
});
// all environments

app.set('views', __dirname + '/server/views');
app.set('view engine', 'hjs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

app.use(require('less-middleware')({ src: __dirname + '/client' }));
app.use(express.static(path.join(__dirname, 'client')));

// development only
app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  console.log('In development mode');
});

app.configure('production', function() {
  app.use(express.errorHandler());
  console.log('Production mode configured.');
});

nconf.file('defaults', 'defaults.json')
     .file('userconfig', 'config.json')
     .env()
     .argv();

mongoose.connect('mongodb://' + nconf.get('database:hostname') + "/" + nconf.get('database:name'));

angularBridge.addResource('projects', models.Project);

app.set('configuration', nconf);

app.set('port', nconf.get('listen') || 3000);

app.get('/', routes.index);


app.use(routes.index);


// for grunt, so we can run the express server
module.exports = app;

if (require.main === module) {
    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
}

