var xhrRequest = function (url, type, callback) {
var xhr = new XMLHttpRequest();
xhr.onload = function () {
callback(this.responseText);
};
xhr.open(type, url);
xhr.send();
};
 
function locationSuccess(pos) {
  // Construct URL
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" +
  pos.coords.latitude + "&lon=" + pos.coords.longitude;
 
  // Send request to OpenWeatherMap
  xhrRequest(url, 'GET',
  function(responseText) {
  // responseText contains a JSON object with weather info
  var json = JSON.parse(responseText);
 
  // Temperature in Kelvin requires adjustment
  var temperature = Math.round(json.main.temp - 273.15);
  console.log("Temperature is " + temperature);
 
  // Conditions
  var conditions = json.weather[0].main;
  console.log("Conditions are " + conditions);
  // Assemble dictionary using our keys
  //Defining KEY_TEMPERATURE=0  and KEY_CONDITIONS=1 so that it doesn't creates error in the switch case in .c file
  var dictionary = {0: temperature,1: conditions};
 
  // Send to Pebble
  Pebble.sendAppMessage(dictionary,
  function(e) {
  console.log("Weather info sent to Pebble successfully!");
  },
  function(e) {
  console.log("Error sending weather info to Pebble!");
  }
);