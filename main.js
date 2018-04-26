$(document).ready(function(){
  $("#temp").on("click", function(){
    $("#temp span").toggleClass("usynlig");
    });
})


if( navigator.geolocation ){
  navigator.geolocation.getCurrentPosition(succes,fejl);
} else {
  alert("Din browser understøtter ikke HTML5 geolocation");
}

function succes(voresPos){
  console.log(voresPos.coords.latitude);
  var lat,lon;
  lat = voresPos.coords.latitude;
  lon = voresPos.coords.longitude;
  var parametre = {
    "lat": lat,
    "lon": lon
  }
  //Test af FCC-Weather-API
  $.getJSON("https://fcc-weather-api.glitch.me/api/current",parametre, function(vejr){
  console.log(vejr);
    var ctemp = "<span class='temp'>" + Math.round(vejr.main.temp) + "&deg;C</span>"
    var ftemp = "<span class='temp usynlig'>" + Math.round(fahr(vejr.main.temp)) + "&deg;F</span>"

    $("#temp").html(ctemp+ftemp);
    $("#by").text(vejr.name);
    $("#vejr-ikon").attr("src",vejr.weather["0"].icon);
  });
}

function fejl(fejltype){
  console.log("Det er ikke muligt at få en position");
  console.log(fejltype);
}
function fahr(c) {
  return c * 9/5 + 32;
}

