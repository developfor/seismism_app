$(function() {


var jsonurl = "data/significant_week.json";

$.ajax({ 
    type: 'GET', 
    url: jsonurl, 
    data: { get_param: 'value' }, 
    dataType: 'json',
    success: function (data) { 
        var location_eq = data.features[0].properties.place
        var time_eq = data.features[0].properties.time
        var time_converted = moment(time_eq).format("MMM DD, YYYY @ h:mma");
        var mag_eq = data.features[0].properties.mag
        var felt_eq = data.features[0].properties.felt

        $("#latest-location-eq").append(location_eq);
        $("#latest-time-eq").append(time_converted);
        $("#latest-mag-eq").append(mag_eq);
        $("#latest-felt-eq").append(felt_eq);

        var infoText = function(){

            //a dispatch table for the button clicks
            //the key is the name of the command table entry
            //functions are held as the value and passed back to a variable
            var commandTable = {
                info_button_latest_toggle: function() { $('#info-text-latest').toggle();},
                info_text_latest_close: function() { $('#info-text-latest').hide();},
                1: function(){ $("#info-button-latest-toggle").css('background-position', '-28px -0.5px');},
                0: function(){ $("#info-button-latest-toggle").css('background-position', '0px -0.5px');} 
            };
            //keeps track if the info button is currently clicked
            var clicked = 0;
            //hover for the info button
            $('#info-button-latest-toggle').hover( function(){
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

            $('.info-button-latest').on('click', function(){
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
        }; //END OF INFOTEST

        infoText();


   
    }

    

});

});

