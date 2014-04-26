var tableVisualisation = function(data){

	var canAnimate = 1;
	

	var init = function(data){
		var dataset = [];
		data.forEach(function(entry){	
			var parsedTime = moment(entry.time).format("MMM DD, YYYY @ h:mma");
			var country = entry.place.split(',')[1];
			var location = entry.place.split(',')[0];
			
			if (country === undefined || location === undefined){
				var thisPlace = entry.place;
			} else{
				var thisPlace = country + ", " + location;
			}
			var datum = {};
			datum["time"] = parsedTime;
			datum["latitude"] = entry.latitude;
			datum["longitude"] = entry.longitude;
			datum["mag"] = entry.mag;
			datum["place"] = thisPlace;
			dataset.push(datum);
		});
		tableSort(dataset);
		makeTable(dataset);
	};

	var makeTable = function(data){

		console.time("Array initialize");
		var cTable = $('#table-body');

		$(cTable).empty()

		var table = '<table>'

		data.forEach(function(entry){
			var row = '<tr>' ;
        
        // create a new Label Text
            row += '<td>' + entry.time  + '</td>';
            row += '<td>' + entry.mag + '</td>';  
            row += '<td>' + entry.place + '</td>';  
            row += '<td>' + entry.latitude + ", " + entry.longitude + '</td>';  
    	row +='</tr>';
    	table += row;

    });
		table += '</table>'

		// data.forEach(function(entry){
		// 	var row = $('<tr></tr>');

		// 	var col = $('<td></td>').text(entry.time);
		// 	row.append(col);

		// 	col = $('<td></td>').text(entry.mag);
		// 	row.append(col);

		// 	col = $('<td></td>').text(entry.place);
		// 	row.append(col);

		// 	col = $('<td></td>').text(entry.latitude + ", " + entry.longitude);
		// 	row.append(col);

		// 	table.append(row);
		// })

		cTable.append(table);
		canAnimate = 1;
		console.timeEnd("Array initialize");
	};

	var sort = function(qtable, sortParameter, direction){
		qtable.sort(function(a, b) {			
				return d3[direction](a[sortParameter], b[sortParameter]);
		});

	
	};

	var tableSort = function(data){
		var previous = 'table-time',
		whichDirection = "descending",
		directionArray = ["descending", "ascending"],
		directionSwitch = 0;
		


		$('.table-sort').on('click', function(){

			if (canAnimate === 1){
				canAnimate = 0;
				var current = this.id;
				var sortBy = $(this).attr('id').split('-')[1];
				if(current != previous){
					$('.table-sort').css('background-color', '#474747');
					$('#' + this.id).css('background-color', '#2E5879');
					sort(data, sortBy, whichDirection);
					makeTable(data);
					previous = current;
					// canAnimate = 1;

				} else{
					directionSwitch = 1 - directionSwitch;
					whichDirection = directionArray[directionSwitch];
					sort(data, sortBy, whichDirection);
					makeTable(data);
					// canAnimate = 1;

				}
			}
			
		});
	}
	init(data);
};
