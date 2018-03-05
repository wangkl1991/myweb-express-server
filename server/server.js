const port = process.env.PORT || '3000';


var path = require('path');
var http = require('http');
var express = require('express');

var cors = require('cors');
var config = require('./config/config');

//
var bodyParser = require('body-parser');
var debug = require('debug')('mean-app:server');

/* EXPRESS */

var app = express();
app.use(bodyParser.json());
app.use(cors())

/* ROUTES */
var blogRoutes = require('./routes/blog.routes');

app.use('/blog', blogRoutes);

/* DATABASE */
// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });


/* SECURITY */

// var jwt = require('jsonwebtoken'); // security token


/* SERVER */
var server = http.createServer(app);
app.set('port', port);
server.listen(port, function () { console.log('Server Listening on Port %d', port); });
server.on('error', onError);
server.on('listening', onListening)

/**
 * Event listener for http server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for http server "listening" event.
   */
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }


