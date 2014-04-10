var barVisualistion = function(data){

	//function to calculate the number of earthquakes in each class of magnitude
	//the return value is an array of objects
	//The array has the lower and upper magnitudes for each class of magnitude
	//The name of each class of magnitudes and the range of numbers for that class
	//The number of earthquakes in the magnitude class
	var mag_numbers = function(data){
		var magnitudes = [
		{"lower": 3,  "upper": 3.9, "name": "Minor","magnitude": "3 - 3.9" ,"numberOf": 0},
		{"lower": 4,  "upper": 4.9, "name": "Light", "magnitude": "4 - 4.9" , "numberOf": 0},
		{"lower": 5,  "upper": 5.9, "name": "Moderate", "magnitude": "5 - 5.9" , "numberOf": 0},
		{"lower": 6,  "upper": 6.9, "name": "Strong", "magnitude": "6 - 6.9" , "numberOf": 0},
		{"lower": 7,  "upper": 7.9, "name": "Major", "magnitude": "7 - 7.9" ,"numberOf": 0},
		{"lower": 8,  "upper": 1000, "name": "Great", "magnitude": "8+" , "numberOf": 0}];

		data.forEach(function(entry){
			magnitudes.forEach(function(magEntry){
				if(entry.mag >= magEntry.lower && entry.mag <= magEntry.upper){
					magEntry.numberOf = magEntry.numberOf + 1;
					return;
				}
			});
		});
		return magnitudes
	};

	//variables for postion and sizes
	var margin = {top:15, right:0, bottom: 15, left:0},
	width = 200 - margin.right - margin.left,
	height = 350 - margin.top - margin.bottom,
	padding = 10;

	//call the mag_numbers function and store the return value in the variable
	//the variable holds the array of objects with the number of each earthquake by class
	var magnitude = mag_numbers(data);

	var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
    .range([height, 0]);

	var svg = d3.select(".block-graph").append('svg')
		.attr("width", width)
		.attr("height", height);

	update();

	function update(){

		x.domain(magnitude.map(function(d) { return d.name; }));
		y.domain([0, d3.max(magnitude, function(d) { return d.numberOf; })]);

		var rect = svg.selectAll(".graph-bar")
		.data(magnitude);

		rect.enter().append("rect")
		.attr("class", "graph-bar");

		rect.attr("x", function(d) { return x(d.name); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.numberOf); })
		.attr("height", function(d) { return height - y(d.numberOf); })
		.attr('fill', 'steelblue');

		rect.exit()
		.transition()
		.duration(2000)
		.remove();
	}//END OF UPDATE FUNCTION

};