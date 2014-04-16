var scatterVisualisation = function(data){
	//variables for postion and sizes
	var margin = {top:5, right:5, bottom: 5, left:5},
	width = 500 - margin.right - margin.left,
	height = 190 - margin.top - margin.bottom,
	padding = 40,
	padding2 = 30,
	minRadius = 1,
	maxRadius = 7,
	yMultiply = 0.3
	xAxisStart = 1;

	//variables for data
	var mag1 = [],
	mag4 = [],
	mag5 = [],
	data1 = 0,
	data4 = 4.5,
	data5 = 5.5;

	//used to checked which button has been clicked. Used in on click function 
	var previous,
	buttonHighlight = '#2E5879';

	var svg = d3.select("#viz-b").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//the variables hold the different scale functions
	var xScale = xScales(data);
	var yScale = yScales(data);
	var rScale = rScales(data);
	var colorScale = colorScales(data);
	var xAxis = xAxes(data);
	var yAxis = yAxes(data);

	//*******SCALING FUNCITONS************
	function xScales(data){
		return d3.scale.linear()
			.domain([d3.min(data, function(d) { return +d.mag - xAxisStart; }), d3.max(data, function(d) { return +d.mag; })])
			.range([padding, width - padding]);
	}	

	function yScales(data){
		return d3.scale.linear()
			.domain([d3.min(data, function(d) {
				if(+d.depth < 0){ 
				return +d.depth; 
				} else { return 0;}
				}), d3.max(data, function(d) { return +d.depth; })])
			.range([height - padding, padding * yMultiply]);
	}

	function rScales(data){
		return d3.scale.linear()
			.domain([d3.min(data, function(d) { return +d.mag; }), d3.max(data, function(d) { return +d.mag; })])
			.range([minRadius, maxRadius]);
	}

	function colorScales(data){
		return d3.scale.linear()
			.domain([d3.min(data, function(d) { return +d.mag; }), d3.max(data, function(d) { return +d.mag; })])
			.range(["red", "orange"]);
	}

	function xAxes(data){
		return d3.svg.axis()
			.scale(xScales(data))
			.orient("bottom")
			.ticks(9);
	}

	function yAxes(data){
		return d3.svg.axis()
			.scale(yScales(data))
			.orient("left")
			.ticks(5);
	}

	//********END OF SCALING FUNCTIONS

	//Parses the data, returns an array of objects for particular magnitudes
	var parseData = function(number){
		var tempArray = [];//will hold the temporary array
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

	//fill each array with data
	mag1 = parseData(data1);
	mag4 = parseData(data4);
	mag5 = parseData(data5);

	//update creates and updates the graph
	var update = function(data){	
		//*******THE AXIS these are called once these are the initial axis ********/
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (height - padding) + ")")
			.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + padding + ",0)")
			.call(yAxis);

		svg.append("text")
			.attr("class", "label")
			.attr("y", 0)
			.attr("x", -150)
			.attr("dy", ".85em")
			.attr("transform", "rotate(-90)")
			.text("depth of focus (km)");

		svg.append("text")
			.attr("class", "label")
			.attr("x", width - 320)
			.attr("y", height - 3)
			.text("earthquake magitude");

		//this function visualises the initial data and all updates
		//including updating the axis.
		var graphUpdate = function(data){
			//update the scales with the new data
			xScale = xScales(data);
			yScale = yScales(data);
			rScale = rScales(data);
			colorScale = colorScales(data);
			xAxis = xAxes(data);
			yAxis = yAxes(data);

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
				.style("opacity", "0.5");

			circle.exit()
				.transition()
				.duration(1000)
				.attr("r", "0")
				.style("opacity", "0")
				.remove();

			//updates the axis
			svg.select(".x.axis")
				.transition()
				.duration(1000)
				.call(xAxis);

			svg.select(".y.axis")
				.transition()
				.duration(1000)
				.call(yAxis);
   		};//END OF GRAPHUPDATE

   		//call graphUpdate on initial update call
   		graphUpdate(data);
   		//calls graphUpdate when buttons are clicked
   		//checks the id of the clicked DOM element and uses that
   		//to work out which array of data is passed to graphUpdate.
   		$('.b-button').on('click', function(){
   			var picked = this.id;
   			if(picked != previous){
   				$('#mag1, #mag4, #mag5').css('background-color', 'white')
   				.css('color', 'black');

   				$(this).css('background-color', buttonHighlight)
   				.css('color', 'white');

   				if(picked === "mag1"){
   					minRadius = 1;
   					maxRadius = 7;
   					xAxisStart = 1;
   					graphUpdate(mag1);

   				}else if(picked === "mag4"){
   					minRadius = 2;
   					maxRadius = 8;
   					xAxisStart = 0.5;
   					graphUpdate(mag4);
   				}else if(picked=== "mag5"){
   					minRadius = 4;
   					maxRadius = 12;
   					xAxisStart = 0.5;
   					graphUpdate(mag5);
   				}
   			}
   			previous = picked;
   		});
	};//END OF UPDATE
	//Call the initial update and pass all the data
	update(mag1);
};