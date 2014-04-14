(function(window, document, undefined){
	var dataVisualisation = function(){

		d3.csv("data/all_week.csv", function(error, data){
			if(error){
				console.log("there is an error " + error);
			} else {
				var dataset = [];
				data.forEach(function(entry){
					if(entry.mag >= 0  && entry.type === "earthquake"){
						var datum = {};
						datum["time"] = entry["time"];
						datum["latitude"] = entry.latitude;
						datum["longitude"] = entry.longitude;
						datum["depth"] = entry.depth;
						datum["mag"] = entry.mag;
						datum["place"] = entry.place;
						datum["id"] = entry.id;
						dataset.push(datum);
					}
				});
				scatterVisualisation(dataset);
				totalEarthquakes(dataset.length);
				barVisualisation(dataset);
				mapVisualisation(dataset);

				// Time of the last entry in the csv.
				var lastEntry = dataset.slice(-1).pop().time
				$("#total-eq-since").append(moment(lastEntry).format("MMM DD, YYYY @ h:mm A"));
			}
		});
	};
	dataVisualisation();
})(this, document);