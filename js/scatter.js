var scatterVisualistion = function(data){

	var margin = {top:5, right:5, bottom: 5, left:5},
	padding2 = {top: 30, right: 30, bottom: 20, left:30},
	width = 500 - margin.right - margin.left,
	height = 200 - margin.top - margin.bottom,
	padding = 45,
	minRadius = 0.2,
	maxRadius = 4
	yMultiply = 0.5;

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

  	// svg.append("g")
   //    .attr("id", "circles");

       svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);
    
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

     svg.append("text")
    	.attr("class", "y label")
    	.attr("y", 2)
    	 .attr("x", -150)
    	.attr("dy", ".85em")
    	.attr("transform", "rotate(-90)")
    	.text("depth of focus (km)");

    svg.append("text")
    .attr("class", "x label")
    .attr("x", width - 320)
    .attr("y", height - 3)
    .text("earthquake magitude");

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
};

