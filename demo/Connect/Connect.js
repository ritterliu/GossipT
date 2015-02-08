var connect = require('connect');
var timer = require('./request_time');
var server = connect.createServer();
server.use(connect.logger('dev'));
server.use(connect.logger(' :remote-addr'));
server.use(timer({time:500}));

server.use(function (req, res, next){
    console.log("AAAAA");
    if('/a' == req.url) {
        res.writeHead(200);
        res.end('Fast!');
    } else {
        next();
    }
});

server.use(function (req, res, next){
    console.log("BBBBB");
    if('/b' == req.url) {
        setTimeout(function(){
            res.writeHead(200);
            res.end('Slow!');
        }, 1000);
    } else {
        next();
    }
});


server.listen(3000);
