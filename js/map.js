var mapVisualisation = function(data){
 // console.log(data);
var mapData = data;
var newMarker;

var map = L.map('viz-map',{zoomControl:false, keyboard: true});
// .valueOf()
var lastEntryTime = moment.utc(data[1]["time"]);
console.log(lastEntryTime);
	 
var lastEntryTime2 = moment.utc(data[1]["time"]).subtract('days', 2);
console.log(lastEntryTime2);


var lonLat = new L.LatLng(15.62303, 154.3359375);
map.setView(lonLat, 1);
// console.log(map.getBounds())

 // map.fitBounds([79.17133464081945, 380.390625],[-70.37785394109224, 42.1875]);
// map.panTo(new L.LatLng(16.97274, 208.47656));
map.setMaxBounds([
    [84.9901001802348, 383.203125],
    [-85.05112877980659, -54.84375]
]);

map.on('dragend', function(e){
console.log(map.getBounds());
});

// add an OpenStreetMap tile layer

// L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	// continuousWorld: 'true',
	minZoom: 1,
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
    // console.log(d3.select("viz-map").append("svg").attr("width",200).attr("height",200))


	var svgCircle;
	if(mData.mag < 1){
	svgCircle = '<div class="mag-circle-1"></div>'
	}else if (mData.mag >= 1 && mData.mag < 2){
	svgCircle = '<div class="mag-circle-1"></div>'
	}else if (mData.mag >= 2 && mData.mag < 3){
	svgCircle = '<div class="mag-circle-2"></div>'
	}else if (mData.mag >= 3 && mData.mag < 5){
	svgCircle = '<div class="mag-circle-3"></div>'
	}else if (mData.mag >= 5 && mData.mag < 6){
	svgCircle = '<div class="mag-circle-4"></div>'
	}else if (mData.mag >= 6 ){
	svgCircle = '<div class="mag-circle-5"></div>'
	}

    

 var vbIcon = L.divIcon({
	className: 'svg-marker',
    html: svgCircle,
    // iconSize: [8, 8],
    // iconAnchor:[0,0]
	});

var marker = new L.marker([mData["latitude"], long],{icon: vbIcon}).addTo(map);

// var newMarker;
marker.on('click', function(){


 console.log(location);
		if(typeof newMarker != "undefined"){
			console.log('hi')
			 map.removeLayer(newMarker);
		}
	

		 var eqTime = moment(mData.time).format("MMM DD, YYYY @ h:mma");
		$("#quake-details").css('visibility', 'visible');
		$("#map-quake-time").empty().append(eqTime);
		$("#map-quake-mag").empty().append(mData.mag);
		$("#map-quake-place").empty().append(mData.place);
		$("#map-quake-depth").empty().append(mData.depth);
		$("#map-quake-latitude").empty().append(mData.latitude);
		$("#map-quake-longitude").empty().append(mData.longitude);

		

		var long = parseFloat(mData.longitude)
		if (long < 0) {
        long += 360;
    	}
 // <svg width="24" height="24"> <circle r="8" cx="12" cy="12" style="fill: #F60; fill-opacity: 0; stroke-width: 3px; stroke: #EE2D5A;"></circle></svg>
    	var markSVGCircle = '<div class="mag-circle-selected"></div>'
    	// var markSVGCircle = 'howdy'
		var markIcon = L.divIcon({
					 className: 'markIcon',
    				 html: markSVGCircle,
    				 iconSize: [10, 10],
    				 iconAnchor:[11,11]
					});

		   newMarker = new L.marker([mData.latitude, long],{icon: markIcon}).addTo(map);
	
		 // newMarker = new L.marker([mData.latitude, long]).addTo(map);
		});
		

});




};

