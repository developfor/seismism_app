setTimeout(function(){
(function(window, document, undefined){
	var dataVisualisation = function(){

		d3.json("data/all_week.json", function(error, data){
			if(error){
				console.log("there is an error " + error);
			} else {
				var dataset = [];
				// console.log(console.log(data.features[1].geometry.coordinates))

				data.features.forEach(function(entry){
					// console.log(entry.properties.mag)
					if(entry.properties.mag > 0  && entry.properties.type === "earthquake"){
						var datum = {};
						datum["time"] = entry.properties["time"];
						datum["latitude"] = entry.geometry.coordinates[1];
						datum["longitude"] = entry.geometry.coordinates[0];
						datum["depth"] = entry.geometry.coordinates[2];
						datum["mag"] = entry.properties.mag;
						datum["place"] = entry.properties.place;
						datum["id"] = entry.properties.id;
						dataset.push(datum);
					}
				});	



				// preloader begin
				$("body").append('<div id="load-line" ></div>');
				complete = function(){
					$("#dashboard-blocks").animate( {'opacity':1}, 2000);
				};
				 
				var components = [
					totalEarthquakes,
					scatterVisualisation,
					barVisualisation,
					mapVisualisation,
					tableVisualisation,
					instructions,
					complete
				];
				var totalComponents = components.length;

				function recursiveCreation(components){
					
					var leftToLoad = components.length/totalComponents,
						amountLeft =  1-leftToLoad,
						percentage = Math.round(amountLeft*100),
					    percentageToString = percentage.toString() + "%";

					// console.log(percentage);

					var loadLine = function(){

						// $("#load-line").remove();
						 // console.log(percentageToString);
						   $("#load-line").css("width", percentageToString);
						  // $("#load-line").animate({"width": percentageToString});
						  // $("#load-line").animate({"width": percentageToString}, "slow");

						// $("#load-line").css("transition", "1s");
						
					}
					loadLine();

					 if(components.length === 0){
					 	setTimeout(function(){$("#load-line").animate({"opacity":0})}, 600);
					 	setTimeout(function(){$("#loading-text").remove()});
					 
					 }
					if(components.length){
						var component = components.shift();
						component(dataset);
						setTimeout(function(){recursiveCreation(components)}, 1);
					}

					
				};
			
				recursiveCreation(components);
				// preloader end

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
	setTimeout(dataVisualisation(), 0);
})(this, document);


}, 1000);
