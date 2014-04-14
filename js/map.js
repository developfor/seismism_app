var mapVisualisation = function(data){

	var rMin = 1,
		rMax = 12,
		expo = 1;

	var margin = {top: 5, left: 5, bottom: 5, right: 5},
	width = 716 - margin.left - margin.right,
	height = 335 - margin.top - margin.bottom;

	var projection = d3.geo.mercator()
		.scale(80)
		.rotate([210, 0])
		.translate([width / 2.9, height / 1.8]);

	var svg = d3.select("#viz-map").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	// .attr("transform", "translate(-200,-20)");
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var path = d3.geo.path()
	.projection(projection);

	// START OF JSON DISPLAY MAP
	d3.json("data/world_map.json", function(error, topology) {

		if (error){
			console.log("error loading map json: " + error);
		} else {

			//START OF TSV 
			d3.csv("data/all_week.csv", function(error, data) {

				if (error) { 
					console.log("there is an error " + error); 
				} 
				else {
	
					var mapData = [],
						tableData = [];

						data.forEach(function(entry){
							var mapQuake = {};
							mapQuake["latitude"] = entry.latitude;
							mapQuake["longitude"] = entry.longitude;
							mapQuake["mag"] = entry.mag;
							mapQuake["id"] = entry.id;
							mapData.push(mapQuake);

							var tableQuake = {};
							tableQuake["time"] = entry.time;
							tableQuake["mag"] = entry.mag;
							tableQuake["id"] = entry.id;
							tableQuake["place"] = entry.place;
						});

					map(mapData);

			    } //END OF DATA ERROR ELSE

			});  //END OF CSV

			svg.selectAll("path")
			.data(topojson.object(topology, topology.objects.countries)
				.geometries)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("id", "map-path");
		}//END OF MAP ELSE ERROR
	});  //END OF MAP

	//START OF MAP FUNCTION
	function map(data){

		var radius = d3.scale.pow().exponent(expo)
		.domain([0, d3.max(data, function(d){return d.mag;})])
		.range([rMin, rMax]);
  

		var circle = svg.selectAll("circle")   
		.data(data);

		circle.enter()
		.append("circle");

		circle.attr("cx", function(d) {            
			return projection( [d.longitude, d.latitude])[0];
		})
		.attr("cy", function(d) {
			return projection([d.longitude, d.latitude])[1];
		});

		circle.style("fill", "#0099ba")
		.style('opacity', "0.4")
		.attr("r", function(d){ return radius(d.mag);})
		.attr("id", function(d){ return d.id });


		circle.exit().remove();
	}
};