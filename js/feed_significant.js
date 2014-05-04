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

 		
    	
    	// console.log(data.features[0].properties.mag);
    	// console.log(data.features[0].properties.place);
    	
    	// console.log(time_eq);
    	// console.log(data.features[0].properties.felt);
    	 // console.log(data);
         // var toggle = 0;

           var infoTest = function(){
             $('.info-button-latest-mag').on('click', function(){
                var thisID = this.id;
                if(thisID === "info-button-latest"){
                    $('#info-text-latest').show();
                    $("#info-button-latest").css('background-position', '-28px -0.5px');
                } else if(thisID === "info-text-latest-close"){
                    $('#info-text-latest').hide();
                     $("#info-button-latest").css('background-position', '0px -0.5px');
                }
            });


           

                
                // $('body').on('click', function(){
                //    if (toggle === 1){ 
                //     $('#info-text-latest').hide();
                //     toggle = 0;
                //    }
                // });

    
            
        }
            infoTest();


   
    }

    

});

});

