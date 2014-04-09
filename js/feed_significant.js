var jsonurl = "data/significant_week.json";

$.ajax({ 
    type: 'GET', 
    url: jsonurl, 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 


 		var time_eq = data.features[0].properties.time
		var felt_eq = data.features[0].properties.felt
    	
    	console.log(data.features[0].properties.mag);
    	console.log(data.features[0].properties.place);
    	console.log(moment(time_eq).format("MMM DD, YYYY @ hh:mm A"));
    	console.log(time_eq);
    	console.log(data.features[0].properties.felt);
    	console.log(data.features[0].properties);
   
    }
});

