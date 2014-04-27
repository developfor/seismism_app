var tableVisualisation = function(data){

	var init = function(data){
		var dataset = [];
		data.forEach(function(entry){	
			var parsedTime = moment(entry.time).format("MMM DD, YYYY @ h:mma");
			var country = entry.place.split(',')[1];
			var location = entry.place.split(',')[0];
			
			if (country === undefined || location === undefined){
				var thisPlace = entry.place;
			} else{
				var thisPlace = country + ", " + location;
			}
			var datum = {};
			datum["time"] = parsedTime;
			datum["latitude"] = entry.latitude;
			datum["longitude"] = entry.longitude;
			datum["mag"] = entry.mag;
			datum["place"] = thisPlace;
			dataset.push(datum);
		});

		makeTable(dataset);
	};

	var makeTable = function(data){
		var cBody = $('#table-body-id');

		data.forEach(function(entry){
			var row = '<tr>';
			row += '<td>' + entry.time  + '</td>';
			row += '<td>' + entry.mag + '</td>';  
			row += '<td>' + entry.place + '</td>';  
			row += '<td>' + entry.latitude + ", " + entry.longitude + '</td>'; 

			row +='</tr>'; 
			cBody.append(row);

		});

		$('#table-id').dataTable({
			"sScrollY": "220px",
			"sPaginationType": "full_numbers",
			"iDisplayLength": 100,
			"bFilter": false,
			"bLengthChange": false
		});


	};

	init(data);
};
