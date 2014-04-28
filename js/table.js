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

	var makeTableCircles = function(data){
		
		var width = 50,
		height = 50
		scaleRangeMin = 2,
		scaleRangeMax = 16;

		var mags = function(d) {return d.mag; },
        d3Min = d3.min(data, mags),
        d3Max = d3.max(data, mags);

		var radius = d3.scale.pow()
					.exponent(1).domain([d3Min, d3Max])
					.range([2, 16]);

		var color = d3.scale.linear()
    			.domain([d3Min, d3Max])
    			.range(["#008000", "#FFF700"]);

		var svg = d3.selectAll(".circle-table")
		.data(data)
		.append("svg:svg")
		.attr('width', width)
		.attr('height', height);

		svg.append("circle")
		.attr("r", function(d){return radius(d.mag);})
		.attr("cx", width/2)
		.attr("cy", height/2)
		.attr("fill", function(d){ return color(d.mag)});
	};

	var makeTable = function(data){

		var cBody = $('#table-body-id');

		data.forEach(function(entry){
			var row = '<tr>';
			row += '<td>' + entry.time  + '</td>';
			row += '<td><span class = "table-mag">' + entry.mag + '</span><span class = "circle-table"></span>' + '</td>';  
			row += '<td>' + entry.place + '</td>';  
			row += '<td>' + entry.latitude + ", " + entry.longitude + '</td>'; 

			row +='</tr>'; 
			cBody.append(row);

		});

		makeTableCircles(data);

		$('#table-id').dataTable({
			"sScrollY": "220px",
			"sPaginationType": "full_numbers",
			"iDisplayLength": 100,
			"bFilter": false,
			"bLengthChange": false,
			"aaSorting": [[ 4, "desc" ]]
		});
	};

	init(data);
};
