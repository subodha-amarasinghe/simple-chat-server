var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var messageid = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

io.on('connection', function (socket) {
    socket.on('chat join', function (nickname) {
        console.log('nickname: ' + nickname);
        io.emit('chat join', nickname);
    });

    socket.on('chat message', function (msg, mynickname) {
        messageid++;
        console.log('nickname: ' + mynickname, msg);
        io.emit('chat message', msg, mynickname, messageid);
    });

    socket.on('chat delete', function (msgid, mynickname) {
        io.emit('chat delete', msgid, mynickname);
    });
});

http.listen(4000, function () {
    console.log('listening on *:4000');
});