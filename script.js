//get the data

var getJSON = function(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

getJSON('url').then(function(data) {
    var myJson = JSON.parse(xhr.responseText);
    return myJson;
}, function(status) {
  alert('Something went wrong' + this.status +' '+ this.statusText);
});

//render the map

var map = L.map('map',{
  center: [38.82259, -2.8125],
  zoom: 2,
  minZoom: 0,
  maxZoom: 8
});

var osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
    noWrap: false, 
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
.addTo(map);

//slider

$(function() {
  var baseDate = new Date(2015, 6, 14);
  $('#datepicker').datepicker({
  defaultDate: -31
}); 
  $('#slider').slider({ 
        slide: function(event, ui) { 
              var date = new Date(baseDate.getTime());
                console.log(date);
              date.setDate(date.getDate() + ui.value);
              $('#datepicker').datepicker('setDate', date); 
        }
  });
});
