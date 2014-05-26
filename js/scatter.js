var scatterVisualisation = function(data){
	//variables for postion and sizes
	var margin = {top:5, right:5, bottom: 5, left:15},
	width = 500 - margin.right - margin.left,
	height = 175 - margin.top - margin.bottom,
	padding = 40,
	padding2 = 30,
	minRadius = 1,
	maxRadius = 7,
	yMultiply = 0.3,
	xAxisStart = 0.1;

	//variables for data
	var mag1 = [],
	mag4 = [],
	mag5 = [],
	data1 = 0,
	data4 = 4.5,
	data5 = 5.5;


	//used to checked which button has been clicked. Used in on click function 
	var previous = "mag1",
	buttonHighlight = '#F8BD00';

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
			.domain([-30, d3.max(data, function(d) { return +d.depth; })])
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
			.range(["#008000", "#FFF700"]);
	}

	function xAxes(data){
		return d3.svg.axis()
			.scale(xScales(data))
			.orient("bottom")
			.ticks(7)
			.tickSize(8, 0);
	}

	function yAxes(data){
		return d3.svg.axis()
			.scale(yScales(data))
			.orient("left")
			.ticks(5)
			.tickSize(5, 0);
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

			circle.style("fill", "green")
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
				// opacity of dots
				.style("opacity", "0.8");

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
			.attr("y", -5)
			.attr("x", -115)
			.attr("dy", ".85em")
			.attr("transform", "rotate(-90)")
			.text("earthquake depth (km)");

		svg.append("text")
			.attr("class", "label")
			.attr("x", width - 300)
			.attr("y", height - 9)
			.text("earthquake magnitude");

   		//calls graphUpdate when buttons are clicked
   		//checks the id of the clicked DOM element and uses that
   		//to work out which array of data is passed to graphUpdate.
   		$('.b-button').on('click', function(){
   			var picked = this.id;
   			if(picked != previous){
   				$('#mag1, #mag4, #mag5').css('background-color', '#2E5879')
   				.css('color', 'white');

   				$(this).css('background-color', buttonHighlight)
   				.css('color', '#2A2A2A');

   				if(picked === "mag1"){
   					minRadius = 1;
   					maxRadius = 7;
   					xAxisStart = 0.1;
   					graphUpdate(mag1);

   				}else if(picked === "mag4"){
   					minRadius = 2;
   					maxRadius = 8;
   					xAxisStart = 0.2;
   					graphUpdate(mag4);
   				}else if(picked=== "mag5"){
   					minRadius = 4;
   					maxRadius = 12;
   					xAxisStart = 0.2;
   					graphUpdate(mag5);
   				}
   			}
   			previous = picked;
   		});
	};//END OF UPDATE

	var infoText = function(){
		//a dispatch table for the button clicks
		//the key is the name of the command table entry
		//functions are held as the value and passed back to a variable
		var commandTable = {
		    info_button_magnitude_toggle: function() { $('#info-text-magnitude').toggle();},
		    info_text_magnitude_close: function() { $('#info-text-magnitude').hide();},
		    1: function(){ $("#info-button-magnitude-toggle").css('background-position', '-28px -0.5px');},
		    0: function(){ $("#info-button-magnitude-toggle").css('background-position', '0px -0.5px');} 
		};
		//keeps track if the info button is currently clicked
		var clicked = 0;
		//hover for the info button
	   	$('#info-button-magnitude-toggle').hover( function(){
	   		//if clicked === 0 then the info button is in a non-clicked state
	   		//and so should change on hover over
	   		if (clicked === 0){
	      		$(this).css('background-position', '-28px -0.5px');
	  		}
	   	},
	   	function(){
	   		if(clicked === 0){
	   			//the out state for the hover
	      		$(this).css('background-position', '0px -0.5px');
	  		}
	   	});

		$('.info-button-magnitude').on('click', function(){
			//change clicked to 1 or 0 depending on the state before
			clicked = 1 - clicked;

			//get the id of info button clicked
			var thisId = this.id;
			//convert the id so that it can work in the dispatch table
			//dashes need to be underscors
			var convertId = thisId.replace(/-/g,"_");
			//call 
			var toggleBox = commandTable[convertId];
			var toggleInfo = commandTable[clicked];

			toggleBox();
			toggleInfo();

		});
	}; //END OF INFOTEXT

	//Call the initial update and pass all the data
	update(mag1);
	infoText();
};