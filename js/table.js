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
			row += '<td><span class = "table-mag">' + entry.mag + '</span><span class = "circle-table"></span>' + '</td>';  
			row += '<td>' + entry.place + '</td>';  
			row += '<td>' + entry.latitude + ", " + entry.longitude + '</td>'; 

			row +='</tr>'; 
			cBody.append(row);

		});


		var width = 50,
		height = 50;


		var svg = d3.selectAll(".circle-table")
      .data(data)
    .append("svg:svg")
    .attr('width', width)
          .attr('height', height);

          svg.append("circle")
          .attr("r", function(d){return d.mag * 3;})
          .attr("cx", width/2)
          .attr("cy", height/2)
          .attr("fill", "green")



       // var circile = svg.selectAll("circle")
       // 		.data
       //    .enter()
       //    .append("circle")
       //    .attr("r", "4")
          

   //        var circle = svg.selectAll("circle")


			// circle.enter()
			// 	.append("circle");
			

			// circle.style("fill", "green")
			// 	.attr("r", "6");
       



		// 		var margin = {top:5, right:5, bottom: 5, left:5},
		// 	width = 200 - margin.right - margin.left,
		// 	height = 200 - margin.top - margin.bottom;

		// var svg = d3.selectAll(".circle-table").append("svg")
  //           .attr("width", width + margin.left + margin.right)
  //           .attr("height", height + margin.top + margin.bottom)
  //           .append("g")
  //           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //          var circle = svg.selectAll("circle")
		// 		.data(data);

		// 	circle.enter()
		// 		.append("circle");
			

		// 	circle.style("fill", "green")
		// 		.attr("r", "6");

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
