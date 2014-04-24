var tableVisualisation = function(data){

	var init = function(data){
		var dataset = [];
		data.forEach(function(entry){	
			var parsedTime = moment(entry.time).format("MMM DD, YYYY @ h:mma");

			var datum = {};
			datum["time"] = parsedTime;
			datum["latitude"] = entry.latitude;
			datum["longitude"] = entry.longitude;
			datum["mag"] = entry.mag;
			datum["place"] = entry.place;
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

			col = $('<td></td>').text(entry.latitude + ", " + entry.longitude);
			row.append(col);

			col = $('<td></td>').text(entry.place);
			row.append(col);

			table.append(row);
		})

		cTable.append(table);
	};

	var sort = function(qtable, sortParameter){
		qtable.sort(function(a, b) {
			return d3.descending(a[sortParameter], b[sortParameter]);
		});
	};

	var tableSort = function(data){

		// var current = 'table-time'; table-mag

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
