//////////////////////////
var socket = io.connect("http://g7handsome.ddns.net:569");
var width ;
var height ;
var rank = [];
var ShowTops = 10;
playerData = {
	id:"unknown"
}
/////////////////////////////////
value = {
	questionString:"",
	questionOptions:[],
	time:0,
	set_time:100000,
	selectingOption:-1,
	correct_answer:-1,
	game_end:false,
	waiting:false,
	admin:true
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
	ShowingText = "unknown"
	CurrentTemp = 0;
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
	sendMsg("change_name",{name:"IAMTHEADMING7"});
}
function updateOptionDisplay(){}
function draw(){
	value.admin = true;
	if(!window.mobile_check()){
		cnavas.size(innerWidth,innerHeight)
	}
	

	background(255)
	

	
	fill(0,255,0);
	var g = 0;
	var ww = width;
	var hh = 30;
	var rr = width/height;
	var percent = value.time/value.set_time;
	rect(g,g,(ww-g*2)*percent,hh*rr-g);

	stroke(0);
	fill(0)
	strokeWeight(1);
	var fontSize = 30;
	textSize(fontSize);
	textAlign(CENTER);
	text("fps: "+round(frameRate()),100,300)
	if(!value.waiting){
		text(value.questionString.split("").join(" "),0,50,width-10,height)
	}else{
		var gg = fontSize+10;
		total = rank.length-max(rank.length-ShowTops,0)
		for(var i = max(rank.length-ShowTops,0); i < rank.length ; i++){
			var hh = i-max(rank.length-ShowTops,0);
			//console.log("height: "+height-80-hh*gg);
			text(abs(total-hh)+" "+rank[i][0]+" :"+rank[i][1],width/2,height-80-hh*gg)
		}
	}
	//text(ShowingText,canvas.width/2,canvas.height/2)
}
function request_rank(){
	sendMsg("request_rank",{})
}
function show_rank(){

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