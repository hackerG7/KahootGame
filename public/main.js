//////////////////////////
//load images
let CurrentImage;
let CurrentBackgroundColor = 255;



let CorrectImage;
let WrongImage;
function preload() {
	CorrectImage = loadImage('images/correct.jpg');
	WrongImage = loadImage('images/wrong.jpg');
}
var socket = io.connect("http://g7handsome.ddns.net:569");
var width ;
var height ;
playerData = {
	id:"unknown"
}
/////////////////////////////////
value = {
	questionString:"",
	questionOptions:[],
	answerPercentageList:[],
	time:0,
	set_time:100000,
	selectingOption:-1,
	correct_answer:-1,
	game_end:false,
	waiting:false,
	resultText:"",
	resultColor:"black",
	admin:false
	
}
function sendAnswer(i){
	sendMsg("get_answer",{
		answerIndex:i
	})
}
///////////////////////////////
function setup(){
	/*
	var scale = 'scale(2)';
document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
 document.body.style.msTransform =   scale;       // IE 9
 document.body.style.transform = scale;     // General*/
	socket.on("Data",DataHandle);
	sendMsg("request_update");
	console.log("requested update")
	ShowingText = "unknown"
	CurrentTemp = 0;
	buttonList = [];
	width = innerWidth;
	height = innerHeight;
	if(window.mobile_check()){
		z = 2;
		width /= z;
		height /= z;
		mobile_zoom(z);
		canvas = createCanvas(width,height)
	}else{
		cnavas = createCanvas(width,height)
	}
	var color = [
		"brown",
		"yellow",
		"aqua",
		"pink"
	]
	for(var i = 0; i < 4 ; i++){
		b = new Button("",0,height/2-100+i*50-30,width, 35)
		b.id = i;
		b.set_css({
            "background-color": color[i],
            "border": "2px solid black",
            "border-radius":"5px",
            color: "black",
            padding: "5px 5px",
            "text-align": "center",
            "font-size": "16px",
            margin: "0px 0px",
            opacity: "0.8",
            transition: "0.0s",
		})
		function onTop(){
            if(value.questionOptions[this.master.id]!=undefined){
                this.style("opacity","1")
            }
        }
        function onBottom(){
            this.style("opacity","0.8")
        }
		b.button.mouseOver(onTop).mouseOut(onBottom);
		b.button.id = i;
        b.button.mousePressed(function(){
			value.selectingOption = this.id;
			sendAnswer(value.selectingOption)
			console.log(this.id)
		})
	}
	var name = prompt("your name: ","unnamed");
	sendMsg("change_name",{name:name});
}
function draw(){
	if(!window.mobile_check()){
		cnavas.size(innerWidth,innerHeight)
	}

	background(CurrentBackgroundColor)
	stroke(0);
	strokeWeight(0);
	textSize(50);
	textAlign(CENTER);
	text("fps: "+round(frameRate()),100,300)
	if(!value.game_end){
		var ww = width;
		var hh = 30;
		var rr = width/height;
		var g = 0;
		noFill();
		rectMode(CORNER);
		rect(g,g,ww-g*2,hh*rr-g)
		var percent = value.time/value.set_time;
		strokeWeight(1);
		fill(0,255,0);
		rect(g,g,(ww-g*2)*percent,hh*rr-g);
		
		//text(value.time+" / "+value.set_time,width-300,90)
	}
	fill(0);
	textSize(20)
	//draw question
	text(value.questionString.split("").join(" "),30,50,width-60,height)
	//draw result
	textSize(50);
	if(value.waiting){
		if(get_myPlayer().getCorrect()){
			value.resultText = "正確!"
			value.resultColor = "lime";
		}else{
			value.resultText = "錯誤!";
			value.resultColor = "red"
		}
		fill(value.resultColor);
		text(value.resultText,width/2, height*3/4);
		fill(0);
	}
	
	textSize(30)
	
	for(var p of playerList){
		p.update();
	}
	var p = get_myPlayer();
	if(p!=undefined){
		text(p.points,50,200)
	}
	if(keyIsPressed){
		var p = get_myPlayer()
		if(p!=undefined){
			var press = [
				keyCode==ascii("1"),
				keyCode==ascii("2"),
				keyCode==ascii("3"),
				keyCode==ascii("4")
			]
			if(press[0]||press[1]||press[2]||press[3]){
				value.selectingOption = keyCode-49
				sendAnswer(value.selectingOption)
			}
		}
	}
	//text(ShowingText,canvas.width/2,canvas.height/2)
}
function updateOptionDisplay(){
	for(var i = 0 ; i < 4 ; i++){
		var option = value.questionOptions[i];
		if(value.selectingOption==i){
			buttonList[i].button.style("border-color:lime");
		}else{
			buttonList[i].button.style("border-color:black")
		}
		/*if(value.selectingOption==i){
			if(i!=value.correct_answer && value.waiting){
				//draw red text to show your answer is wrong
				stroke(255,0,0)
				fill(255,0,0)
			}else{//draw green text show your selected answer
				stroke(0,255,0)
				fill(0,255,0)
			}
		}else{
			stroke(0)
			fill(0)
		}*/
		if(i==value.correct_answer){
			stroke(255,0,200)
			fill(255,0,200)
		}
		if(option == null){
			buttonList[i].button.elt.innerHTML = "";
		}else{
			buttonList[i].button.elt.innerHTML = option;
			if(value.waiting){
				if(value.answerPercentageList != null){
					var percentage = value.answerPercentageList[i];//let 0.66666
					percentage = round(percentage*100)
					buttonList[i].button.elt.innerHTML = option+"  ("+percentage+"%)";
					
				}
			}
		}
		//text((i+1)+": "+option,width/2,height/2-100+i*50)
	}
}
function mousePressed(){
	sendMsg("clicking",{x:mouseX,y:mouseY})
}
/*
function keyPressed(){
	if(keyCode == ascii('M')){
		
		//current_image = clamp_loop(current_image+1,0,2)
	}
}


function mousePressed(){
	
	
}
*/