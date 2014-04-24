var tableVisualisation = function(data){

	var makeTable = function(data){

		  var cTable = $('#table-body');

  $(cTable).empty()

  var table = $('<table></table>');

  data.forEach(function(entry){
    var row = $('<tr></tr>');

    var col = $('<td></td>').text(moment(entry.time).format("MMM DD, YYYY @ h:mma"));
      row.append(col);

      col = $('<td></td>').text(entry.mag);
      row.append(col);

      col = $('<td></td>').text(entry.place);
      row.append(col);

    table.append(row);

})

cTable.append(table);




		// var cTable = $('#block-quake-table');

		// $(cTable).empty()

		// var table = $('<table></table>');

		// var row = $('<tr></tr>');

		// var col = $('<th></th>').text(headings[0]);
		// row.append(col);

		// var col = $('<th></th>').text(headings[1]);
		// row.append(col);

		// var col = $('<th></th>').text(headings[2]);
		// row.append(col);

		// table.append(row);

		// data.forEach(function(entry){

		// 	var row = $('<tr></tr>');
		// 	var col = $('<td></td>').addClass('one').text(moment(entry.time).format("MMM DD, YYYY @ h:mma"));
		// 	row.append(col);

		// 	var col = $('<td></td>').addClass('one').text(entry.mag);
		// 	row.append(col);

		// 	col = $('<td></td>').addClass('two').text(entry.place);
		// 	row.append(col);



		// 	table.append(row);

		// });

		// cTable.append(table);


		//SETS UP THE SCROLLING FOR THE LIST OF EARTHQUAKES
    // $("#block-quake-table").niceScroll({autohidemode:false,cursorwidth:"8px",cursorborderradius:"0px", cursorfixedheight: 70, railpadding:{top:0,right:1,left:0,bottom:0}, horizrailenabled:false, cursorcolor:"#282F35", cursorborder: "0px", background: "grey", cursorminheight: "10",boxzoom:true});


		

	};


	makeTable(data)
	
};
