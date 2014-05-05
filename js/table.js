var tableVisualisation = function(data){

	//init takes in the data and updates the place and time data
	//Time is reformated by moment.js
	//The Place string is swapped so the Country or District is shown before the distance
	var init = function(data){
		var dataset = [];

		data.forEach(function(entry){
				
						var datum = {};
						//reformats the time data with moment.js	
						datum["time"] = moment(entry.time).format("MMM DD, YYYY @ h:mma");
						datum["latitude"] = entry.latitude;
						datum["longitude"] = entry.longitude;
						datum["depth"] = entry.depth;
						datum["mag"] = entry.mag;

						//Splits the place data a the comma and stores the results in two variables
						var country = entry.place.split(',')[1];
					 	var location = entry.place.split(',')[0];
					 	//Checks is the place data is split by a comma
						//if its not split then the entry stays the same
						//If it is then the string after the comma is moved to the
						//string before the comma
					 	if (country === undefined || location === undefined){
							datum["place"] = entry.place;
						}else{
							datum["place"] = country + ", " + location;
						}

						dataset.push(datum);
				});

		makeTable(dataset);
	};

	//funciton to make the svg magnitude circles for the table
	var makeTableCircles = function(data){
		//variables to hold width and height.
		//scaleRangeMin and scaleRangeMax are the radius min and max
		var width = 30,
		height = 30,
		scaleRangeMin = 2,
		scaleRangeMax = 15;

		//finds the minimum and maximum magnitude values
		var mags = function(d) {return d.mag; },
        d3Min = d3.min(data, mags),
        d3Max = d3.max(data, mags);

        //the radius scale takes the minimum and maximum magnitude values
        //the range is the scaleRange Min and Max 
		var radius = d3.scale.linear()
					.domain([d3Min, d3Max])
					.range([scaleRangeMin, scaleRangeMax]);

		//The color scale takes the minimum and maximum magnitude values
		//the range is two colors
		var color = d3.scale.linear()
    			.domain([d3Min, d3Max])
    			.range(["#00BAFF", "#2B4051"]);

    	//selects the span in the magnitude column in datatable
    	//the data is attached to it and a width and height given
		var svg = d3.selectAll(".circle-table")
		.data(data)
		.append("svg:svg")
		.attr('width', width)
		.attr('height', height);

		//a circle is appended to the selection and the size and color of the circle
		//is from the magnitude data passed throug the radius and color functions
		//the cx and cy of the cirlce is the width and height divided by 2
		svg.append("circle")
		.attr("r", function(d){return radius(d.mag);})
		.attr("cx", width/2)
		.attr("cy", height/2)
		.attr("fill", function(d){ return color(d.mag)});
	};

	//function to make the table
	var makeTable = function(data){

		//CBody holds the id of the table body
		var cBody = $('#table-body-id');

		//iterate through the data
		data.forEach(function(entry){
			//the variable row initial holds the <tr> tag
			//It is added on to with the time, magnitude, place and latitude
			//the final element added is the </tr> tag
			var row = '<tr>';
			row += '<td>' + entry.time  + ' (UTC)' +'</td>';
			//spans are added with a class- the first span holds the magnitude text
			//the second span holds the d3 svg and is used in the makeTableCircles function
			//the table-mag class styles the text so it sits well with the svg element
			row += '<td><span class = "table-mag">' + entry.mag + '</span><span class = "circle-table"></span>' + '</td>';  
			row += '<td>' + entry.depth + '</td>';
			row += '<td>' + entry.place + '</td>';  
			row += '<td>' + entry.latitude + ", " + entry.longitude + '</td>'; 
			
			row +='</tr>'; 
			//row is appended to the table body
			cBody.append(row);

		});

		//call the function that creates the d3 svg magnitude circles
		makeTableCircles(data);

		//attached the table to datatable.js
		$('#table-id').dataTable({
			"sScrollY": "220px",
			"sPaginationType": "full_numbers",
			"iDisplayLength": 100,
			"bFilter": false,
			"bLengthChange": false,
			"aaSorting": [[ 5, "desc" ]] //initial sorting descending by first column
		});
	};

	init(data);
};
