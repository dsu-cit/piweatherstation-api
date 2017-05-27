var ws = new WebSocket("ws://localhost:8080");

var wind;
var fahrenheit;
var temp;
var humidity;

ws.onmessage = function (event) {
  var message = JSON.parse(event.data);
  message.fahrenheit = Math.round((message.temp * 9 / 5) + 32);

  wind = message.wind;
  fahrenheit = message.fahrenheit;
  humidity = Math.round(message.humidity);

  document.getElementById('fahrenheit').innerHTML = fahrenheit + '&deg;' + ' F'
  document.getElementById('humidity').innerHTML = humidity + '&#37;' + ' RH'
};

window.onload = function () {
  var dps = []; // dataPoints
  CanvasJS.addColorSet("Shades",
[
  "#BD1E43",
])
  var chart = new CanvasJS.Chart("chartContainer",{
    colorSet: "Shades",
    data: [{
      type: "line",
      dataPoints: dps
    }]
  });

  var xVal = 0;
  var yVal = 50;
  var updateInterval = 100;
  var dataLength = 100; // number of dataPoints visible at any point

  var updateChart = function (count) {
    count = 1;
    // count is number of times loop runs to generate random dataPoints.

    for (var j = 0; j < count; j++) {
      yVal = wind;
      dps.push({
        x: xVal,
        y: yVal
      });
      xVal++;
    };
    if (dps.length > dataLength)
    {
      dps.shift();
    }
    chart.render();
  };

  // generates first set of dataPoints
  updateChart(dataLength);

  // update chart after specified time.
  setInterval(function(){updateChart()}, updateInterval);
}
