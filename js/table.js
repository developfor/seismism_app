var tableVisualisation = function(data){

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

		var cTable = $('#table-body');

		$(cTable).empty()

		var table = $('<table></table>');

		data.forEach(function(entry){
			var row = $('<tr></tr>');

			var col = $('<td></td>').text(entry.time);
			row.append(col);

			col = $('<td></td>').text(entry.mag);
			row.append(col);

			col = $('<td></td>').text(entry.place);
			row.append(col);

			col = $('<td></td>').text(entry.latitude + ", " + entry.longitude);
			row.append(col);

			table.append(row);
		})

		cTable.append(table);
	};

	// var sort = function(qtable, sortParameter){
	// 	qtable.sort(function(a, b) {
	// 		if(sortParameter === 'place'){
	// 			return d3.ascending(a[sortParameter], b[sortParameter]);
	// 		} else {
	// 			return d3.descending(a[sortParameter], b[sortParameter]);
	// 		}
	// 	});
	// };

	var sort = function(qtable, sortParameter){
		qtable.sort(function(a, b) {
			
				return d3.descending(b[sortParameter], a[sortParameter] );
		});
	};

	var tableSort = function(data){
		var previous = 'table-time';

		$('.table-sort').on('click', function(){
			var current = this.id;
			if(current != previous){
				$('.table-sort').css('background-color', '#474747');
				$('#' + this.id).css('background-color', '#2E5879');
			
				var sortBy = $(this).attr('id').split('-')[1];

				sort(data, sortBy);
				makeTable(data);

				previous = current;
			}

		});
	}
	init(data);
};
