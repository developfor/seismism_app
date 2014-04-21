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
         var toggle = 0;

           var infoTest = function(){
            $('.info-button-latest').on('click', function(){
                if(toggle === 0){
                $('#info-text-latest').show();
                toggle = 1;
            } else if(toggle === 1){
                $('#info-text-latest').hide();
                toggle = 0;
            }
            // }).on('mouseout', function(){
            //     $('#info-text-latest').hide();
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

