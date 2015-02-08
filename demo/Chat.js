console.log('Coloerful word'.rainbow);

var count = 0;
var users = {};

var net = require('net');
var server = net.createServer(function (conn) {
    conn.setEncoding('utf8');
	console.log('New connection!');
	conn.write('\n > welcome to server' + 
		'\n >' + count + ' other peple here.' +
		'\n > please enter your name:');
	count++;

    var nickname;
	conn.on('data', function (data) {
      	console.log('data:' + data);
        //Remove the enter
        data = data.replace('\r\n', '');
        //First enter is name
        if (!nickname){
            if(users[data]) {
                conn.write('This user ' + data + ' already been registed\n');
                return;
            } else {
                nickname = data;
                users[nickname] = conn;
                broadcast(nickname + " join in chat!\n", true);
            }
        } else {
            //Now enter the message
            broadcast(data, true);

        }
	});

	conn.on('close', function () {
		count--;
		console.log('Count:' + count);
        delete users[nickname];
        broadcast("I quit\n", true);
	});
	
    function broadcast(msg, exceptMe) {
        for(var i in users) {
            if (!exceptMe|| i !=nickname) {
                users[i].write(nickname + ':' + msg + '\n');
            }
        }
    }

	console.log('Count:' + count);
});


server.listen(process.argv[2], function () {
	console.log('Server listening on *:' + process.argv[2]);
});