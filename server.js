var bodyParser = require("body-parser");
var express = require("express");
var WebSocket = require('ws');

var app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json());
app.use(express.static('public'));

var readings = [];

app.get("/readings", function (req, res) {
  res.json(readings);
});

app.post("/readings", function (req, res) {
  var reading = req.body;
  readings.push(reading);
  broadcast(JSON.stringify(reading));
  res.sendStatus(201);
});

var server = app.listen(app.get('port'), function () {
  console.log("Server running on port", app.get('port'));
});

var wss = new WebSocket.Server({ server: server });

var broadcast = function (message) {
  wss.clients.forEach(function (ws) {
    ws.send(message);
  });
};

wss.on('connection', function (ws) {
  console.log("WebSocket client connected.");

  ws.on('close', function () {
    console.log("WebSocket client disconnected.");
  });
});
