var crudApp=new function(){
	
	// ---------프로젝트에 쓰일 데이터들----------
	
	
	//수강 데이터를 담을 Json형식의 배열 만들기
	this.myClass =[
		{ID: '1', Class_Name: '운영체제', Category: '전공필수', Credit:3, },
		{ID: '2', Class_Name: '컴퓨터 구조', Category: '전공선택', Credit:4},
		{ID: '3', Class_Name: '심리학의 이해', Category: '교양필수', Credit:2},
	]
	//선택할 수 있는 항목 미리 정의
	this.Category =['전공필수','전공선택','교양필수','교양선택'];
	
	//table Header에 담길 데이터 확장성을 위해 배열에 담기
	this.col =[];
	
	//-----------------------------------------
	
	
	
	// 위의 데이터들을 토대로 실제로 테이블을 만두어주는 메서드
	this.createTable = () => {
		//테이블을 만들고 데이터를 채우는 코드	
		
		//col에 table header에 해당하는 데이터(myClass의 key값들)들을 넣어주는 코드
	
		//비어있는 col 배열에 myClass 배열 속 객체들의 key 값들을 넣어줘야 함.
		for(var i=0;i<this.myClass.length;i++){
			//각 객체들 축의 key값들 순회
			for(var key in this.myClass[i]){
				//key를 col배열에 담기
					//indexOf() 문자열속의 문자열 검색
				if(this.col.indexOf(key)===-1) this.col.push(key);
			}
		}
		

		var table =document.createElement("table");
		table.setAttribute('id','classTable');
		//tr: 새로운 행 추가
		var tr=table.insertRow(-1);
	
		//th: table header 작성
		for(var h=0;h<this.col.length;h++){
			var th=document.createElement('th');
			th.innerHTML=this.col[h];
			tr.appendChild(th);
		}
		
		//td 작성
		for(var i=0;i<this.myClass.length;i++){
			//table에 한 행 추가
			tr=table.insertRow(-1);
			//table header 길이만큼 순회하며 매칭되는 데이터 갖고오기
			for(var j=0;j<this.col.length;j++ ){
				var tabCell=tr.insertCell(-1);
				//myClass[i]행의 this.col[j]에 해당하는 프로퍼티 값 삽입
				tabCell.innerHTML=this.myClass[i][this.col[j]];
			}
			
			//make Button
			
			//make Update button
			
			//td는 테이블의 열을 만들고 tr(행)의 자식이 됨
			this.td=document.createElement('td');
			tr.appendChild(this.td);
			var btUpdate=document.createElement('input');
			btUpdate.setAttribute('type','button');
			btUpdate.setAttribute('value','Update');//버튼 안의 글씨
			btUpdate.setAttribute('id','Edit'+i);
			btUpdate.setAttribute('style','background-color:#44CCEB');
			btUpdate.setAttribute('onclick','crudApp.Update(this)');//이 버튼이 클릴될 때 실행할 메서드(이벤트 처리)
			this.td.appendChild(btUpdate);
			
			//make save button
			tr.appendChild(this.td);
			var btSave=document.createElement('input');
			btSave.setAttribute('type','button');
			btSave.setAttribute('value','Save');//버튼 안의 글씨
			btSave.setAttribute('id','Save'+i);
			btSave.setAttribute('style','display:none');
			btSave.setAttribute('onclick','crudApp.Save(this)');//이 버튼이 클릴될 때 실행할 메서드(이벤트 처리)
			this.td.appendChild(btSave);
			
			//make delete button
			tr.appendChild(this.td);
			var btDelete=document.createElement('input');
			btDelete.setAttribute('type','button');
			btDelete.setAttribute('value','Delete');//버튼 안의 글씨
			btDelete.setAttribute('id','Delete'+i);
			btDelete.setAttribute('style','background-color:#ED5650');
			btDelete.setAttribute('onclick','crudApp.Delete(this)');//이 버튼이 클릴될 때 실행할 메서드(이벤트 처리)
			this.td.appendChild(btDelete);
		}
		
		//입력 행 추가
		
		tr=table.insertRow(-1);
		for(var j=0;j<this.col.length;j++){
			var newCell=tr.insertCell(-1);
			if(j>=1){
				if(j==2){
				
				//선택 항목을 만들어주기
				var select=document.createElement('select');
				select.innerHTML=`<option value=""></option>`;
				
				for(var k=0;k<this.Category.length;k++){
					select.innerHTML=select.innerHTML+`
					<option value="${this.Category[k]}">${this.Category[k]}</option>`;
				}
				newCell.appendChild(select);
				}
				else{
					var tBox=document.createElement('input');
					tBox.setAttribute('type','text');
					tBox.setAttribute('value','');
					newCell.appendChild(tBox);
				}
			}
		
		}
		
		//Create Btn
		this.td=document.createElement('td');
			tr.appendChild(this.td);
			var btCreate=document.createElement('input');
			btCreate.setAttribute('type','button');
			btCreate.setAttribute('value','Create');//버튼 안의 글씨
			btCreate.setAttribute('id','Create'+i);
			btCreate.setAttribute('style','background-color:#207DD1');
			btCreate.setAttribute('onclick','crudApp.CreateNew(this)');//이 버튼이 클릴될 때 실행할 메서드(이벤트 처리)
			this.td.appendChild(btCreate);
		
		
		
		var div=document.getElementById('container');
		div.innerHTML="수강관리 App";
		div.appendChild(table);
	}
	
	//Delete()
	this.Delete = (oButton)=>{
		//console.log(oButton); //Delete 버튼이 눌린 row에 해당하는 input 태그
		var targetIdx=oButton.parentNode.parentNode.rowIndex;
		this.myClass.splice((targetIdx-1),1);
		this.createTable();
	}
	
	//Create()
	this.CreateNew=(oButton)=>{
		var writtenIdx=oButton.parentNode.parentNode.rowIndex;
		var trData=document.getElementById('classTable').rows[writtenIdx];
		//console.log(trData);
		var obj={};
		
		// tr데이터에서 td속의 key:value만 뽑아서 obj 안에 저장
		for(var i=1;i<this.col.length;i++){
			var td=trData.getElementsByTagName('td')[i];
			//console.log(td);
			if(td.childNodes[0].getAttribute('type')==='text' || td.childNodes[0].tagName==='SELECT'){
				//txtVal 입력하고 선택한 값
				var txtVal=td.childNodes[0].value;
				//console.log(txtVal);
				
				if(txtVal != ''){
					obj[this.col[i]]=txtVal;
				}
				else{
					obj='';
					alert('모든 항목을 입력해야 합니다.');
					break;
				}
			}
			
		}
		obj[this.col[0]]=this.myClass.length+1;
		this.myClass.push(obj);
		this.createTable();
	}
	
	//Update Btn
	this.Update =(oButton) =>{
		var writtenIdx=oButton.parentNode.parentNode.rowIndex;
		var trData=document.getElementById('classTable').rows[writtenIdx];
		//기존 입력된 값들 가져오기
		for( var i=1;i<this.col.length;i++){
			//기존에 입력한 데이터들을 담은 새로운 input/select를 띄어주기
			if(i===2){
				var td=trData.getElementsByTagName('td')[i];
				var select=document.createElement('select');
				select.innerHTML=`<option value ="${td.innerText}">${td.innerText}</option>`;
				for(var k=0; k<this.Category.length;k++){ //옵션 보여주기
					select.innerHTML=select.innerHTML+`
					<option value="${this.Category[k]}">${this.Category[k]}</option>`;
				}
				td.innerText='';
				td.appendChild(select);
			}
			else{
				var td=trData.getElementsByTagName('td')[i];
				var input=document.createElement('input');
				input.setAttribute('type','text');
				input.setAttribute('value',td.innerText);
				td.innerText='';
				td.appendChild(input);
			}
		}
		
		var btSave=document.getElementById('Save'+(writtenIdx-1));
		btSave.setAttribute('style','display:block; background-color: #2DBF64;');
		oButton.setAttribute('style','display:none');
	}
	
	//Save Btn
	this.Save=(oButton)=>{
		var writtenIdx=oButton.parentNode.parentNode.rowIndex;
		var trData=document.getElementById('classTable').rows[writtenIdx];
		
		//새로운 값으로 myClass배열 갱신
		for(var i=1;i<this.col.length;i++){
			var td=trData.getElementsByTagName('td')[i];
			if(td.childNodes[0].getAttribute('type')==='text' || td.childNodes[0].tagName==='SELECT'){
				this.myClass[writtenIdx-1][this.col[i]]=td.childNodes[0].value;
			}
		}
		this.createTable();
		
	}
	
}
crudApp.createTable();
