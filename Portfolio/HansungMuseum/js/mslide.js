
$(function(){
	

	//함수 생성 => 오른쪽(next)버튼 강제(자동) 클릭 이벤트 생성
	//function 함수명(){ 실행문 }
	function autoslide(){
		$("#btnNext").trigger("click");	//trigger메소드 강제 이벤트 발생
	}
		
	
	//함수 자동 실행문  setInterval(함수명,시간);
	setInterval(autoslide,3000);
		
	var img_w=100; //이미지 가로 사이즈
	var img_c=6;   // 이미지의 전체 갯수
	
	//초기값 설정
	$(".wrap_img").css("left","-100%");
	
	n=1;  //첫번째 슬라이드(슬라이드 위치변수)
	
	//next(오른쪽)버튼 클릭시
	$("#btnNext").click(function(){
		
		n++; //한번클릭 n=2, 한더클릭 n=3,4,5,6
		
		if(n==img_c){ //n의 값이 이미지의 전체개수와 같다면
			n=1;
			$(".wrap_img").css("left","-100%");
		}
		
		$(".wrap_img").stop().animate({left:-img_w*n+"%"},500);
		
		//attr("속성","값")  => 속성값 변경메소드
		$(".roundBtn img").attr("src","img/button.png");
		
		if(n==5){
			$(".roundBtn img:eq(0)").attr("src","img/button_on.png");
		}
		
		$(".roundBtn img:eq("+(n-1)+")").attr("src","img/button_on.png");
		
	});
	
	//prev(왼쪽)버튼 클릭시
	$("#btnPrev").click(function(){
		
		n--; 
		
		if(n==-1){ //n의 값이 -1과 같으면
			$(".wrap_img").css({left:-img_w*(img_c-2)+"%"}); //6
			n=img_c-5; //5
		}
		
		$(".wrap_img").stop().animate({left:-img_w*n+"%"},500);
		
		//attr("속성","값")  => 속성값 변경메소드
		$(".roundBtn img").attr("src","img/button.png");
		
		if(n==0){
			$(".roundBtn img:eq(0)").attr("src","img/button.png");
		}
		
		$(".roundBtn img:eq("+(n-1)+")").attr("src","img/button_on.png");
		
	});
	
	
	//라운드 버튼 클릭시
	$(".roundBtn li").click(function(){
		
		n=$(this).index()+1;
		$(".wrap_img").stop().animate({left:-img_w*n+"%"});
		$(".roundBtn img").attr("src","img/button.png");
		$("img",this).attr("src","img/button_on.png");
	});
	
	
	
});

/*TOP 버튼 */

$(function(){

	$("#top").hide();	
	
	$(window).scroll(function(){
		
		if($(this).scrollTop()>300){
			
				$("#top").fadeIn(400);	
				S('header').css("position","fixed");
			
		}else{
				$("#top").fadeOut(400);	
				S('header').css("position","absolute");
			  }
		
	});		
	
/* 네비*/
$('.subMenu').hide();
$('.mainMenu>li').mouseover(function(){
	$(this).find('.subMenu').stop().slideDown(300);                          
});
$('.mainMenu>li').mouseout(function(){
  $(this).find('.subMenu').stop().slideUp(300);    
});

});

// tabmenu - sub
var $Msubmenu = $('.tab-menu > li');
$Msubmenu.click(function () {
  $(this).find('.mobile-subMenu > li').slideToggle();
});


$('.mobile-tab-menu-wrap').hide();
$('.tab-bar').click(function () {
	
	  $('.mobile-tab-menu-wrap').css('left', '0%');
	  $('.mobile-tab-menu-wrap').show();

  });

  $('.close-btn').click(function () {
	
	$('.mobile-tab-menu-wrap').css('left', '-35%');
	$('.mobile-tab-menu-wrap').hide();

});


