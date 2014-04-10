var jsonurl = "data/significant_week.json";

$.ajax({ 
    type: 'GET', 
    url: jsonurl, 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
        var location_eq = data.features[0].properties.place
        var time_eq = data.features[0].properties.time
        var time_converted = moment(time_eq).format("MMM DD, YYYY @ h:mma");
        var mag_eq = data.features[0].properties.mag
        var felt_eq = data.features[0].properties.felt

        $("#latest-location-eq").append(location_eq);
        $("#latest-time-eq").append(time_converted);
        $("#latest-mag-eq").append(mag_eq);
        $("#latest-felt-eq").append(felt_eq);

 		
    	
    	// console.log(data.features[0].properties.mag);
    	// console.log(data.features[0].properties.place);
    	
    	// console.log(time_eq);
    	// console.log(data.features[0].properties.felt);
    	 console.log(data);
   
    }
});



