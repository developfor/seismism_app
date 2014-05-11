var instructions = function(){
	// alert("instructions");
	var clicked = 0
	$("#toggle-instructions").on("click", function(){
		$("#block-instructions-toggle").slideToggle();
		if(clicked === 0){
			$("#toggle-instructions").empty().append("show instructions");
			clicked = 1
		}else{
			$("#toggle-instructions").empty().append("hide instructions");
			clicked = 0
		}
	});
}