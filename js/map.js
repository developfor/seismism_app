var mapVisualisation = function(data){

	var rMin = 0.5,
	rMax = 12,
	expo = 1;

	var magMin = d3.min(data, function(d){ return d.mag; });
	var magMax = d3.max(data, function(d){ return d.mag; });

	var margin = {top: 0, left: 0, bottom: 0, right: 0},
	width = 481 - margin.left - margin.right,
	height = 275 - margin.top - margin.bottom;

	var projection = d3.geo.mercator()
	.scale(77)
	.rotate([210, 0])
	.translate([width / 2, height / 2]);

	var radius = d3.scale.linear()
		.domain([magMin, magMax])
		.range([rMin, rMax]);

	var color = d3.scale.linear()
		.domain([0,9])
		.range(["#008000", "#FFF700"]);

	var svg = d3.select("#viz-map").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
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

					var mapData = [];

					data.forEach(function(entry){
						var mapQuake = {};
						mapQuake["latitude"] = entry.latitude;
						mapQuake["longitude"] = entry.longitude;
						mapQuake["mag"] = entry.mag;
						mapQuake["id"] = entry.id;
						mapQuake["time"] = entry.time;
						mapQuake['place'] = entry.place;
						mapData.push(mapQuake);
					});

					map(mapData);
					clicking(mapData);
	
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

	var clicking = function(data_parsed){

		var start = new Date(data_parsed[data.length - 1].time),
		end = new Date(data_parsed[0].time);

		var day = 0,
		magnitude = 1.0,
		mags = "one";

		$('.button').on('click', function(){
			var whichId = this.id,
			data_temp = [];
			datas = [];

			if (whichId === '0' || whichId === '2' || whichId === '5'){

				day = +whichId;
				var dateTo = d3.time.day.offset(new Date(start),day);

				for(var i = 0; i < data_parsed.length; i++){

					var testDate = new Date(data_parsed[i].time);
					if (testDate >= dateTo){

						data_temp.push(data_parsed[i]);
					}
				}
				for(var i = 0; i < data_temp.length; i++){
					if (data_temp[i].mag >= magnitude){

						datas.push(data_temp[i]);
					}
				}
				map(datas);
			}

			if (whichId === 'one'  || whichId === 'four' || whichId === 'five'){
				mags = whichId;

				if(whichId === 'one'){
					magnitude = 1.0
				}else if(whichId === 'four'){
					magnitude = 4.5;
				}else if(whichId === 'five'){
					magnitude = 5.5;
				}

				var dateTo = d3.time.day.offset(new Date(start),day);

				for(var i = 0; i < data_parsed.length; i++){
					var testDate = new Date(data_parsed[i].time);
					if (testDate >= dateTo){
						data_temp.push(data_parsed[i]);
					}
				}

				for(var i = 0; i < data_temp.length; i++){            
					if (data_temp[i].mag >= magnitude){           
						datas.push(data_temp[i]);
					}
				}
				sort(datas);
				map(datas);

			}
			$('.button').css("opacity", "0.5");

			$('#'+ day.toString()).css("opacity", '1');
			$('#' + mags).css('opacity', '1');

		});
	}; //END OF CLICKING FUNCTION

	//START OF MAP FUNCTION
	function map(data){

		var circle = svg.selectAll("circle")   
		.data(data);

		circle.enter()
		.append("circle")
		.style("fill", function(d){ return color(d.mag); })
		.style("opacity", '0');

		circle.attr("cx", function(d) {            
			return projection( [d.longitude, d.latitude])[0];
		})
		.attr("cy", function(d) {
			return projection([d.longitude, d.latitude])[1];
		})
		.attr("id", function(d){ return d.id; });

		circle.transition()
		.duration(1000)
		.style('opacity', "0.8")
		.attr("r", function(d){ return radius(d.mag);});


		circle.exit()
		.transition()
		.duration(1000)
		.attr('r', '0')
		.style('opacity', '0')
		.remove();

		listText(data);
		overList(data);
	}

	function sort(qtable){
		qtable.sort(function(a, b) {
			return d3.descending(a.mag, b.mag);
		});
	}

	function sortDate(qtable){
		qtable.sort(function(a, b) {
			return d3.descending(a.time, b.time);
		});
	}

	function listText(data){

		sortDate(data);

		var quakeTable = $('#quake-table');

		$(quakeTable).empty();

		data.forEach(function(entry){

			var time_eq = entry.time
        	var time_converted = moment(time_eq).format("MMM DD, YYYY @ h:mma");

			var table = $('<div></div>');

			var test = $('<h1></h1>').text("Magnitude: ");
			var test2 = $('<span></span>').text(entry.mag);

			test.append(test2);
			table.append(test);

			var test = $('<h1></h1>').text("Place: ");
			var test2 = $('<span></span>').text(entry.place);

			test.append(test2);
			table.append(test);

			var test = $('<h1></h1>').text("Time: ");
			var test2 = $('<span></span>').text(time_converted);

			test.append(test2);
			table.append(test);

			table.addClass("table " + entry.id);

			quakeTable.append(table);
		});
	}

	function overList(data){
		var overId,
			temp;

		$('.table').on('mouseover', function(){

			// console.log($(this).css('backgroundColor'))

			// $(this).css('background', 'white');

			var testId = $(this).attr("class").split(' ')[1];
			overId = d3.select('#' + testId);

			$(this).attr('id', 'test');

			var cx = d3.select('#' + testId).attr("cx"),
				cy = d3.select('#' + testId).attr("cy");

			temp = svg.append("g")
						.append('circle')
						.attr("cx", cx)
						.attr("cy", cy)
						.style('fill', 'rgba(248, 189, 0, 0.5)')
						.style('stroke-width', '1.5')
						.style('stroke', 'red')
						.attr('r', "10");
		}).on('mouseout', function(){
					// $(this).css('background', 'transparent');
					temp.remove();
					$(this).removeAttr('id', 'test');
		})
	}

	//SETS UP THE SCROLLING FOR THE LIST OF EARTHQUAKES
    $("#quake-table").niceScroll({autohidemode:false,cursorwidth:"8px",cursorborderradius:"0px", cursorfixedheight: 70, railpadding:{top:0,right:1,left:0,bottom:0}, horizrailenabled:false, cursorcolor:"#282F35", cursorborder: "0px", background: "grey", cursorminheight: "10"});

};
