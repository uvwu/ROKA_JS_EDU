$(document).ready(function(){
	
	// -- 데이터 정의 -- //
	
	// ball Nums
	var circleNumer =0;
	
	// ball type   지름 반지름 색 움직이는 속도
	var circleTypes ={
		"option":["color","width","border-radius",'speed'],
		'small':["black",5,2.5,3000], ///3000 속도가 아니고 한 지점에서 다른 지점으로 움직일 때 걸리는 ms
		'medium':['blue',15,7.5,4000],
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
	$('body').mousemove(function(event){
		mouseX=event.pageX;
		mouseY=event.pageY;
	});
	
	
	//타이머
	function timer(){
		if(gameOn==true){
			// 0.01 (10ms)
			setTimeout(function(){
				t=t+0.01;
				$('.timer').html(`<h1><div class='center'>${t.toFixed(2)}</div></h1>`);
				timer();
			},10);
		};
	};
	
	function animateCircle(circleId,speed,circleSize){
		
		var moveableWidth=$("body").width()-circleSize;
		var moveableHeight=$("body").height()-circleSize;
		
		var circleMoveTop=(moveableHeight*Math.random()).toFixed();
		var circleMoveLeft=(moveableWidth*Math.random()).toFixed();
		
		console.log(circleId+"move");
		$("#"+circleId).animate({
			left: circleMoveLeft,
			top: circleMoveTop
		},speed,function(){
			animateCircle(circleId,speed,circleSize);
		});
		
	};
	
	
	function createCircle(){
		circleNumer++;
		// radnom make one ,small medium large
		var randomOneThree = Math.floor(3*Math.random())+1;
		console.log(randomOneThree);
		if(randomOneThree ==1){
			var circleChoice ="small";
		}else if(randomOneThree ==2){
			var circleChoice ="medium";
		}else if(randomOneThree ==3){
			var circleChoice ="large";
		}
		
		//circle id
		var circleName="circle"+circleNumer;
		
		//랜덤으로 생선된 circleChoice에 맞는 color,size,radius,speed 변수에 담아주기
		var circleColor=circleTypes[circleChoice][0];
		var circleSize=circleTypes[circleChoice][1];
		var circleRadius=circleTypes[circleChoice][2];
		var circleSpeed=circleTypes[circleChoice][3];
		
		
		//공이 움직일 수 있는 범위 지정
		var moveableWidth=$("body").width()-circleSize;
		var moveableHeight=$("body").height()-circleSize;
		
		//공의 초기 시작 좌표
		
		var circlePositionLeft=(moveableWidth*Math.random()).toFixed();
		var circlePositionTop=(moveableHeight*Math.random()).toFixed();
		
		var newCircle="<div class='circle' id= "+circleName+ "></div>";
		$("body").append(newCircle);
		
		
		$("#" + circleName).css({
			"background-color":circleColor,
			"width":circleSize+"vmin",
			"height":circleSize+"vmin",
			"border-radius":circleRadius+"vmin",
			"top":circlePositionTop+"px",
			"left":circlePositionLeft+"px"
		});
		
		// 1ms마다 반복 실행하면서 마우스와의 거리를 계싼하는 함수
		function timeCirclePosition(circleTrackId){//공의 ID
			
			setTimeout(function(){
				//console.log("s1");
				var currentCirclePosition=$(circleTrackId).position();
				//console.log(currentCirclePosition.left);
				var calculatedRadius=parseInt($(circleTrackId).css('width')) * 0.5;
				
				var distanceY = mouseY - (currentCirclePosition.top + calculatedRadius);
				var distanceX = mouseX - (currentCirclePosition.left + calculatedRadius);
			
				if (Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)) <= calculatedRadius) {	
					// 부딪힌 공 빨간색으로 표시		
					$(circleTrackId).removeClass("circle").addClass("redcircle");
					$(circleTrackId).css("background-color", "red")
					endgame();
				};
				timeCirclePosition(circleTrackId);
			},1);
		};
		timeCirclePosition("#"+circleName);
		
		animateCircle(circleName,circleSpeed,circleSize);
		
		setTimeout(function(){
			console.log("s")
			if(gameOn){
				createCircle();
				console.log("c");
			}
		},3000);
		
	}
	
	function endgame(){
		if(gameOn==true){
			gameOn=false;
			updateScores(t);
			$(".circle").remove();
			$(".redcircle").stop();
		};
	};
	
	//시작기능
	$('.startbutton').click(function(){
		//시작에 해당하는 코드
		$(".startbutton").fadeToggle(500, function(){
			gameOn=true;
			timer();
			//console.log('start');
			$('.space').mouseenter(function(){//game over
				endgame();
			});
			createCircle();
		});
	});
	
	var resetButton ="<div class='resetbutton center'><h2>Play Again</h2></div>";
	
	var highScore1=0.00;
	var highScore2=0.00;
	var highScore3=0.00;
	var highScore4=0.00;
	var highScore5=0.00;
	
	
	function updateScores(newScore){
		newScore+=0.01;
		if(newScore>highScore1){
			var redScore ="score1";
			highScore5=highScore4;
			highScore4=highScore3;
			highScore3=highScore2;
			highScore2=highScore1;
			highScore1=newScore;
		}
		
		else if(newScore > highScore2){
            var redScore="score2";
            highScore5=highScore4;
            highScore4=highScore3;
            highScore3=highScore2;
            highScore2=newScore;
        }
       
        else if(newScore > highScore3){
            var redScore="score3";
            highScore5=highScore4;
            highScore4=highScore3;
            highScore3=newScore;
        }
        
        else if(newScore > highScore4){
            var redScore="score4";
            highScore5=highScore4;
            highScore4=newScore;
        }
        
        else if(newScore > highScore5){
            var redScore="score5";
            highScore5=newScore;
		}
		
		var highScorePlace1= "<div class='score center' id='score1'><h2>" + highScore1.toFixed(2) + "</h2></div>";
        var highScorePlace2= "<div class='score center' id='score2'><h2>" + highScore2.toFixed(2) + "</h2></div>";
        var highScorePlace3= "<div class='score center' id='score3'><h2>" + highScore3.toFixed(2) + "</h2></div>";
        var highScorePlace4= "<div class='score center' id='score4'><h2>" + highScore4.toFixed(2) + "</h2></div>";
        var highScorePlace5= "<div class='score center' id='score5'><h2>" + highScore5.toFixed(2) + "</h2></div>";
		
		$("#highscores").append(highScorePlace1,highScorePlace2,highScorePlace3,highScorePlace4,highScorePlace5,resetButton);
		console.log("d");
		$("#"+redScore).css("color","red");
		$("#highscores").toggle();
		
		function gameReset(){
			$("#highscores").fadeToggle(500,function(){
				t=0.00;
			$(".timer").html(`<h1><div class="center">${t.toFixed(2)}</div></h1>`);
			$(".resetbutton").remove();
			$(".score").remove();
			$(".startbutton").toggle();
			$(".redcircle").remove();	
			})
		};
		
		$(".resetbutton").click(function(){
			gameReset();
		});
		
		
	}
	
	

});

