/*
slider
*/

var baseDate = new Date(2015, 6, 18);
var currentDate = new Date(baseDate.getTime());
console.log(currentDate);

$('#datepicker').datepicker({
    defaultDate: baseDate
}); 

$('#slider').slider({
    min: 0,
    max: 31,
    slide: function(event, ui) { 
        currentDate.setDate(currentDate.getDate() + ui.value);
        console.log(moment(currentDate).format('YYYY-MM-DD'));
        $('#datepicker').datepicker('setDate', currentDate); 
    }
});

//TODO label with currentDate

/*
map rendering
*/

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

var countryDataLayer = new L.geoJson().addTo(map);
var countryDataLayerStyle = {
    "color": "#ff7800",
    "weight": 1,
    "opacity": 0.65
};


$.ajax({
    dataType: "json",
    //url: 'http://api.findafire.org/v1/fire-places',
    //data: {'from-date': '2015-01-01','to-date':'2015-08-17'},
    url: 'data/countries_states.geojson',
    success: function(data) {
        $(data.features).each(function(key, data) {
            countryDataLayer.addData(data).setStyle(countryDataLayerStyle);
        });
    }
});

var fireDataLayer = new L.geoJson().addTo(map);
var fireDataLayerStyle = {
    "color": "#A10000",
    "weight": 3
};

var from_date = baseDate;
var to_date = new Date();
to_date.setDate(from_date.getDate()+1);

$.ajax({
    dataType: "json",
    url: 'http://findafire.org/api/v1/fire-places',
    data: {'from_date': from_date,'to_date': to_date, 'country_code': 'UA'},
    success: function(data) {
        $(data.fire_places["2015-08-12"]).each(function(key, data) {
           $.each(data, function (index, data) {
                fireDataLayer.addData(data).setStyle(fireDataLayerStyle);
            })               
        });
    }
});
