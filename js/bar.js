var barVisualisation = function(data){
	//function to calculate the number of earthquakes in each class of magnitude
	//the return value is an array of objects
	//The array has the lower and upper magnitudes for each class of magnitude
	//The name of each class of magnitudes and the range of numbers for that class
	//The number of earthquakes in the magnitude class
	var mag_numbers = function(data){
		var magnitudes = [
		{"lower": 3,  "upper": 3.9, "name": "Minor","magnitude": "3-3.9" ,"numberOf": 0},
		{"lower": 4,  "upper": 4.9, "name": "Light", "magnitude": "4-4.9" , "numberOf": 0},
		{"lower": 5,  "upper": 5.9, "name": "Moderate", "magnitude": "5-5.9" , "numberOf": 0},
		{"lower": 6,  "upper": 6.9, "name": "Strong", "magnitude": "6-6.9" , "numberOf": 0},
		{"lower": 7,  "upper": 7.9, "name": "Major", "magnitude": "7-7.9" ,"numberOf": 0},
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
	var margin = {top:15, right:0, bottom: 50, left:55},
	width = 220 - margin.right - margin.left,
	height = 330 - margin.top - margin.bottom,
	padding = 10;

	//call the mag_numbers function and store the return value in the variable
	//the variable holds the array of objects with the number of each earthquake by class
	var magnitude = mag_numbers(data);

	var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
	.range([height, 0]);

	var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(6)
	.tickSize(6, 0);

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(6);

	var svg = d3.select("#viz-graph").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	update(magnitude);

	function update(magnitude){
		x.domain(magnitude.map(function(d) { return d.name; }));
		y.domain([0, d3.max(magnitude, function(d) { return d.numberOf; })]);




		var graphUpdate = function(){

			x.domain(magnitude.map(function(d) { return d.name; }));
			y.domain([0, d3.max(magnitude, function(d) { return d.numberOf; })]);

			var rect = svg.selectAll(".graph-bar")
			.data(magnitude);

			rect.enter().append("rect")
			.attr("class", "graph-bar");

			rect.attr("x", function(d) { return x(d.name); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) {return y(d.numberOf); })
			.attr("height", function(d) { return height - y(d.numberOf); })
			.attr('fill', 'steelblue');

			rect.exit()
			.transition()
			.duration(2000)
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

			// $( "#amount" ).val( "7");
			// $( "#amount" ).text( "7");

			d3.selectAll("rect")
			.on("mouseover", function(d) {
				$(this).css("fill", "#4682B4");
	            //Update the tooltip position and value
	            d3.select("#tooltip")        
	            	.select("#value")
	            	.text(d.numberOf);
	           
	            d3.select("#earthquake-type")
	            	.text(d.name);         
	            //Show the tooltip
	            d3.select("#tooltip").classed("hidden", false);

		        })
			.on("mouseout", function() {
	            //Hide the tooltip
	            $(this).css("fill", "#00BAFF");
	            d3.select("#tooltip").classed("hidden", true);
		    });

		}//END OF GRAPHUPDATE FUNCTION

		function slide(){
			var data_parsed = [];

			for(i = 0; i < data.length; i++){
				var quake = {}
				quake["time"] = data[i].time;
				quake["mag"] = data[i].mag;
				data_parsed.push(quake);
			}

			var start = new Date(data_parsed[data_parsed.length - 1].time);
			var end = new Date(data_parsed[0].time);

			var curr_date = start.getDate();
		    var curr_month = start.getMonth() + 1; //Months are zero based
		    var curr_year = start.getFullYear();
		    var start_date = curr_date + "/" + curr_month + "/" + curr_year;

		    curr_date = end.getDate();
		    curr_month = end.getMonth() + 1; //Months are zero based
		    curr_year = end.getFullYear();
		    var end_date = curr_date + "/" + curr_month + "/" + curr_year;

		    var slide = 8;

		    $("#slider-range-max" ).slider({
		    	range: "max",
		    	min: 1,
		    	max: 7,
		    	value: 7,
		    	slide: function( event, ui ) {
		    		var data_temp = [];

		    		$("#amount").html(ui.value);
		    		if(ui.value === 1){
		    			$("#days").html(" day.")
		    		}else{
		    			$("#days").html(" days.")
		    		}
		    	
		    		slide = ui.value;

		    		slide = -slide;

		    		var dateTo = d3.time.day.offset(new Date(end), slide);

		    		for(var i = 0; i < data_parsed.length; i++){
		    			var testDate = new Date(data_parsed[i].time);

		    			if (testDate >= dateTo){
		    				data_temp.push(data_parsed[i]);
		    			}
		    		}

		    		magnitude = mag_numbers(data_temp);
		    		graphUpdate();

		    		var starts = new Date(data_temp[data_temp.length - 1].time);
		    		var ends = new Date(data_temp[0].time);

		    		curr_date = starts.getDate();
			      	curr_month = starts.getMonth() + 1; //Months are zero based
			      	curr_year = starts.getFullYear();
			      	start_date = curr_date + "/" + curr_month + "/" + curr_year;

			      	curr_date = ends.getDate();
			      	curr_month = ends.getMonth() + 1; //Months are zero based
			      	curr_year = ends.getFullYear();
			      	end_date = curr_date + "/" + curr_month + "/" + curr_year;
			      }
		  	});
	
		};//END OF SLIDE FUNCTION

		var infoTest = function(){
			$('.info-button').on('mouseover', function(){
				$('#info-text').show();
			}).on('mouseout', function(){
				$('#info-text').hide();
			});

		};

		graphUpdate();
		slide();
		infoTest();

		//The axis are added at the end so they are on top of the bars
		svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-2em")
		.attr("transform", function(d) {
			return "translate(-10,5)rotate(-65)" 
		})
		.append("text")
		.style("text-anchor", "start")
		.attr("y", 28)
		.text("earthquake magitude class");

		svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -40)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.attr("background-color", "pink")
		.text("Frequency of earthquakes");
	}//END OF UPDATE FUNCTION


};