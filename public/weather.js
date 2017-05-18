var ws = new WebSocket("ws://localhost:8080");

ws.onmessage = function (event) {
  var message = JSON.parse(event.data);
  console.log(message);
};
