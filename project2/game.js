$(document).ready(function(){
	
	// -- 데이터 정의 -- //
	
	// ball Nums
	var cicleNumer =0;
	
	// ball type   지름 반지름 색 움직이는 속도
	var cicleTypes ={
		"option":["color","width","border-radius",'speed'],
		'small':["black",5,2.5,3000], ///3000 속도가 아니고 한 지점에서 다른 지점으로 움직일 때 걸리는 ms
		'mediun':['blue',15,7.5,4000],
		'large':['yellow',30,15,5000]
	};
	
	//e.g circleChoice 라는 변수에 small
	//circleTypes[circleChoice][0]==black(color)
	//circleTypes[circleChoice][1]==(width)
	//circleTypes[circleChoice][2]==(border-radius)
	
	//times
	
	var t=0;
	
	// 게임 실행 여부
	var gameOn=false;
	
	//마우스 포인터
	var mouseX;
	var mouseY;
	
	// -- --- -- -- //
	
	
	//마우스 움직임을 좌표에 담아주는 함수
	$('body').mousemove(function(){
		mouseX=event.pageX;
		mouseY=event.pageY;
	})
	
	//타이머
	function timer(){
		if(gameOn==true){
			// 0.01 (10ms)
			setTimeout(function(){
				t=t+0.01;
				$('.timer').html(`<h1><div class='center'>${t.toFixed(2)}</div></h1>`);
				timer();
			},10)
		}
	};
	
	//시작기능
	$('.startbutton').click(function(){
		//시작에 해당하는 코드
		$(".startbutton").fadeToggle(500, function(){
			gameOn=true;
			timer();
			//console.log('start');
			$('.space').mouseenter(function(){//game over
				//console.log('end');
				endgame();
			});
			
			createCircle();
			
		});
		
	});
	

});

