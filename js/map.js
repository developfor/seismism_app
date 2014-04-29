var mapVisualisation = function(data){
// console.log(data);
var mapData = data;

var map = L.map('viz-map',{zoomControl:false, keyboard: false});


	 

var lonLat = new L.LatLng(15.62303, 154.3359375);
map.setView(lonLat, 1);
console.log(map.getBounds())

 // map.fitBounds([79.17133464081945, 380.390625],[-70.37785394109224, 42.1875]);
// map.panTo(new L.LatLng(16.97274, 208.47656));
map.setMaxBounds([
    [88.27655136092483, 492.18749999999994],
    [-87.9535588895499, -184.21874999999997]
]);

map.on('dragend', function(e){
console.log(map.getBounds());
});

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	   // continuousWorld: 'true',

    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
new L.control.zoom({position: 'topright'}).addTo(map);

// add a marker in the given location, attach some popup content to it and open the popup
// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup. <br> Easily customizable.');


// var totalMarkers = mapData.length;
// for(var i = 0; i<totalMarkers; i++){
//     var mData = mapData[i];
//     if (mData.longitude < 0) {
//         mData.longitude += 360;
//     }
//     L.marker([mData.latitude, mData.longitude]).addTo(map);
// }




mapData.forEach(function(location) {
	var mData = location,
		long = parseFloat(mData.longitude),
		lat = parseFloat(mData.latitude);
    // console.log(location)
    if (long < 0) {
        long += 360;
    }
    // var num = 4;
    console.log(
    	'<div><svg width="14" height="16"> <circle r="'+ mData.mag*4 +'" cx="7" cy="7" style="fill: #e5d6ac; fill-opacity: 0.5; stroke-width: 1.5px; stroke: #EE2D5A ;"></circle></svg></div>')


    var magCircle = mData.mag 
    var svgCircle = '<div><svg width="12" height="12"> <circle r="'+ 4 +'" cx="6" cy="6" style="fill: #e5d6ac; fill-opacity: 0.5; stroke-width: 1.5px; stroke: #EE2D5A ;"></circle></svg></div>'

 var vbIcon = L.divIcon({
	className: 'svg-marker',
    html: svgCircle
	});

var marker = new L.marker([mData["latitude"], long],{icon: vbIcon}).addTo(map);
			 // markers.addLayer(marker);
// console.log(location["latitude"]);


});




};


// plotting all locations

// var list = data
// var locArray = [];

