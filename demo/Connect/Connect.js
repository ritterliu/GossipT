var connect = require('connect');
var server = connect.createServer();
server.use(connect.static(__dirname + '/websites'));
server.listen(3000);