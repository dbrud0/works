$(function(){

$(".top").hide();	
	
	$(window).scroll(function(){
		
		//top버튼이 
		
		// 가능  if($(this).scrollTo>10);{
		if($(this).scrollTop()>300){
			
				$(".top").fadeIn(400);	
				S('header').css("position","fixed");
			
		}else{
				$(".top").fadeOut(400);	
				S('header').css("position","absolute");
			  }
		
	});		
	

});