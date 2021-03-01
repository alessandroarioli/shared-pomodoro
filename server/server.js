const http = require("http")
const WebSocketServer = require('websocket').server;
const path = require("path");
const express = require("express");
const serverless = require('serverless-http');

const app = express(); // create express app

const devEnv = false;

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// Websockets

//initialize a simple http server
const server = http.createServer(app);

const wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    let connection = request.accept('echo-protocol', request.origin);

    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {
        console.log(message);

        const timerState = message['utf8Data'] === 'true' ? 'started' : 'stopped'

        wsServer.broadcast("timer." + timerState)

        const sessionState = message['utf8Data'] === 'true' ? 'started' : 'stopped'

        wsServer.broadcast("timer." + timerState)
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

//start our server
if (devEnv === true) {
    server.listen("8080", () => {
        console.log(`Server started on port ${server.address().port} :)`);
    });
}

module.exports = express;
module.exports.handler = serverless(app);