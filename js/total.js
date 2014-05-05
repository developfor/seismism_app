var totalEarthquakes = function(dataset){

	$('.prime-info-text-middle').text(dataset.length);
	var lastEntry = dataset.slice(-1).pop().time
	$("#total-eq-since").append(moment(lastEntry).format("MMM DD, YYYY @ h:mm A"));

		var infoText = function(){
			//a dispatch table for the button clicks
			//the key is the name of the command table entry
			//functions are held as the value and passed back to a variable
			var commandTable = {
			    info_button_total_toggle: function() { $('#info-text-total').toggle();},
			    info_text_total_close: function() { $('#info-text-total').hide();},
			    1: function(){ $("#info-button-total-toggle").css('background-position', '-28px -0.5px');},
			    0: function(){ $("#info-button-total-toggle").css('background-position', '0px -0.5px');} 
			};
			//keeps track if the info button is currently clicked
			var clicked = 0;
			//hover for the info button
		   	$('#info-button-total-toggle').hover( function(){
		   		//if clicked === 0 then the info button is in a non-clicked state
		   		//and so should change on hover over
		   		if (clicked === 0){
		      		$(this).css('background-position', '-28px -0.5px');
		  		}
		   	},
		   	function(){
		   		if(clicked === 0){
		   			//the out state for the hover
		      		$(this).css('background-position', '0px -0.5px');
		  		}
		   	});

			$('.info-button-total').on('click', function(){
				//change clicked to 1 or 0 depending on the state before
				clicked = 1 - clicked;

				//get the id of info button clicked
				var thisId = this.id;
				//convert the id so that it can work in the dispatch table
				//dashes need to be underscors
				var convertId = thisId.replace(/-/g,"_");
				//call 
				var toggleBox = commandTable[convertId];
				var toggleInfo = commandTable[clicked];

				toggleBox();
				toggleInfo();

			});
		}; //END OF INFOTEXT

	infoText();
}
