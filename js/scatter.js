var scatterVisualistion = function(data){

	var margin = {top:5, right:5, bottom: 5, left:5},
	// padding2 = {top: 30, right: 30, bottom: 20, left:30},
	width = 500 - margin.right - margin.left,
	height = 200 - margin.top - margin.bottom,
	padding = 40,
	padding2 = 30,
	minRadius = 0.2,
	maxRadius = 4
	yMultiply = 0.3;

	var mag1 = [],
	mag4 = [],
	mag5 = [],
	data1 = 0,
	data4 = 4.5,
	data5 = 5.5;

	var svg = d3.select("#viz-b").append('svg')
	.attr("width", width)
	.attr("height", height);

	var xScale = d3.scale.linear()
	.domain([d3.min(data, function(d) { return +d.mag; }), d3.max(data, function(d) { return +d.mag; })])
	.range([padding, width - padding]);

	var yScale = d3.scale.linear()
	.domain([d3.min(data, function(d) { return +d.depth; }), d3.max(data, function(d) { 
		return +d.depth; })])
	.range([height - padding, padding * yMultiply]);

	var rScale = d3.scale.linear()
	.domain([d3.min(data, function(d) { return +d.mag; }), d3.max(data, function(d) { return +d.mag; })])
	.range([0.5, 6]);

	var colorScale = d3.scale.linear()
	.domain([d3.min(data, function(d) { return +d.mag; }), d3.max(data, function(d) { return +d.mag; })])
	.range(["red", "orange"]);


	var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient("bottom")
	.ticks(5);

	var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.ticks(5);

	var parseData = function(number){
		var tempArray = [];

		data.forEach(function(entry){
			var tempObj = {};
			if(entry.mag >= number){
				tempObj["mag"] = entry.mag;
				tempObj["depth"] = entry.depth;
				tempArray.push(tempObj)
			}
		});
		return tempArray;
	};//END OF PARSEDATA

	mag1 = parseData(data1);
	mag4 = parseData(data4);
	mag5 = parseData(data5);

	var update = function(data){	

		svg.append("g")
		.attr("class", "b-axis")
		.attr("transform", "translate(0," + (height - padding) + ")")
		.call(xAxis);

		svg.append("g")
		.attr("class", "b-axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

		svg.append("text")
		.attr("class", "b-label")
		.attr("y", 0)
		.attr("x", -150)
		.attr("dy", ".85em")
		.attr("transform", "rotate(-90)")
		.text("depth of focus (km)");

		svg.append("text")
		.attr("class", "b-label")
		.attr("x", width - 320)
		.attr("y", height - 3)
		.text("earthquake magitude");

		var graphUpdate = function(data){

			var circle = svg.selectAll("circle")
			.data(data);

			circle.enter()
			.append("circle")
			.style("opacity", "0")
			.attr("r", "0");

			circle.style("fill", "#ff5500")
			.transition()
			.duration(1000)
			.attr("cx", function(d) {
				return xScale(d.mag);
			})
			.attr("cy", function(d) {
				return yScale(d.depth);
			})
			.attr("r", function(d){
				return rScale(d.mag);
			})
			.style("fill", function(d) { return colorScale(d.mag); })
			.style("opacity", "0.5")
			.each('end',  function(d){ isClicked = 0;});

			circle.exit()
			.transition()
			.duration(1000)
			.attr("r", "0")
			.style("opacity", "0")
			.remove();
   		};//END OF GRAPHUPDATE

   		graphUpdate(data);

   		$('.b-buttons').on('click', function(){

   			console.log(this);
   			graphUpdate(mag5);
   		});

	};//END OF UPDATE

	update(mag1);
};

