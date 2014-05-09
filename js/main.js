(function(window, document, undefined){
	var dataVisualisation = function(){

		d3.csv("data/all_week.csv", function(error, data){
			if(error){
				console.log("there is an error " + error);
			} else {
				var dataset = [];
				data.forEach(function(entry){
					if(entry.mag > 0  && entry.type === "earthquake"){
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

				var components = [
					totalEarthquakes,
					scatterVisualisation,
					barVisualisation,
					mapVisualisation,
					tableVisualisation
				];

				function recursiveCreation(components){
					//console.log(components);
					if(components.length){
						var component = components.shift();
						component(dataset);
						setTimeout(function(){recursiveCreation(components)}, 100);
					}
				};

				recursiveCreation(components);


				// setTimeout(function(){
				// 	totalEarthquakes(dataset)
				// 	setTimeout(function(){
				// 		scatterVisualisation(dataset)
				// 		setTimeout(function(){
				// 				barVisualisation(dataset)
				// 				setTimeout(function(){
				// 					mapVisualisation(dataset)
				// 					setTimeout(function(){
				// 						tableVisualisation(dataset)
				// 					}, 1000)
				// 				}, 1000)
				// 			}, 1000)	
				// 	}, 1000)
				// }, 1000);
				
				
				// Time of the last entry in the csv.
				// var lastEntry = dataset.slice(-1).pop().time
				//  $("#total-eq-since").append(moment(lastEntry).format("MMM DD, YYYY @ h:mm A"));
			}
		});
	};
	setTimeout(dataVisualisation(), 2000);
})(this, document);

