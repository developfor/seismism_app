var mapVisualisation = function(data){

	var rMin = 1,
		rMax = 12,
		expo = 1;

	var margin = {top: 5, left: 5, bottom: 5, right: 5},
	width = 716 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

	var projection = d3.geo.mercator()
		.scale(75)
		.rotate([210, 0])
		.translate([width / 2.9, height / 1.3]);

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

		console.log(data_parsed[data.length - 1])



	     var start = new Date(data_parsed[data.length - 1].time),
     end = new Date(data_parsed[0].time);



     var day = 0,
     magnitude = 1.0,
     mags = "one";

      $('.button').on('click', function(){
        var whichId = this.id,
        data_temp = [];
        datas = [];

        if (whichId === '0' || whichId === '4' || whichId === '6'){

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
          switch(whichId)
          {
            case 'one':
              magnitude = 1.0;
              break;
            case 'four':
              magnitude = 4.5;
              break;
            case 'five':
              magnitude = 5.5;
              break;
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
};

	//START OF MAP FUNCTION
	function map(data){

		var radius = d3.scale.pow().exponent(expo)
			.domain([0, d3.max(data, function(d){ return d.mag; })])
			.range([rMin, rMax]);

		var color = d3.scale.linear()
					.domain([d3.min(data, function(d){ return d.mag; }),d3.max(data, function(d){ return d.mag; })])
					.range(["#FECF03", "#FF4603"]);
  

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

		circle.style("fill", function(d){ return color(d.mag); })
		.style('opacity', "0.4")
		.attr("r", function(d){ return radius(d.mag);})
		.attr("id", function(d){ return d.id });


		circle.exit().remove();
	}

	function sort(qtable){
  qtable.sort(function(a, b) {
        return d3.descending(a.mag, b.mag);
    });
}
};