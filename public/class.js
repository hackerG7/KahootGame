class Player{
    constructor(id,name){
        this.id = id;
        this.name = name;
        this.index = -1;
        this.points = 0;
        this.x = width+100;
        this.y = height-100;
        this.answer = "";
        this.realButton = new Button("vote",this.x,this.y,80,40)
        this.button = this.realButton.button
        this.button.master = this
        this.button.style("")
        this.button.mousePressed(function(){
            sendMsg("player_vote",{id:this.master.id});
        })
        playerList.push(this);
    }
    remove(){
        this.button.hide();
        this.button = undefined;
        playerList.remove(this);
    }
    getCorrect(){
        return this.answer==value.questionOptions[value.correct_answer]
    }
    update(){
        var pL = playerList.length;
        var qW = width/pL;
        var xx = qW/2+this.index*qW
        var yy = this.y;
        this.x = approach(this.x,xx)
        this.y = approach(this.y,yy)
        this.button.position(this.x-this.button.width/2,this.y-50)
        stroke(255)
        if(this.id==playerData.id){
            stroke(0,255,0)
        }
        if(this.died){
            stroke(255,0,0)
        }
        strokeWeight(2)
        fill(50);
        textSize(20)
        if(this.getCorrect){
            fill(255,0,200)
        }else{
            if(this.id==playerData.id){
                stroke(0,255,0)
            }
            if(this.died){
                stroke(255,0,0)
            }  
            fill(50);
        }
        
        textSize(35)
        textAlign(CENTER)
        ellipse(this.x,this.y,20,20)
        this.button.hide();
    }
}
var playerList = [];
function create_player(id,name = "tester"){
    var p = (get_player(id));
    if(p==undefined){
        var ans = new Player(id,name);
        return ans
    }else{//update object
        playerList.remove(p);
        var p = new Player(id,name);
        return p
    }
}
function get_player(id){
    return playerList.find(x => x.id===id);
}
function get_myPlayer(){
    return get_player(playerData.id)
}

buttonList = [];
class Button{
    constructor(str="Button",x,y,w=20,h=20,update=function(){}){
        this.id = 1;
        this.x = x;
        this.y = y ;
        this.width = w;
        this.height =h;
        this.str =str;
        this.button = createButton(str);
        this.css = {
            "background-color": "aqua",
            "border": "2px solid white",
            "border-radius":"5px",
            color: "black",
            padding: "5px 5px",
            "text-align": "center",
            "font-size": "16px",
            margin: "0px 0px",
            opacity: "0.5",
            transition: "0.003s",
        }
        
        this.button.position(x,y)
        this.button.size(w,h)
        for(let option in this.css){
            this.button.style(option,this.css[option])
        }
        function onTop(){
            if(value.questionOptions[this.master.id]!=undefined){
                this.style("opacity","0.1")
            }
        }
        function onBottom(){
            this.style("opacity","0.5")
        }
        this.button.mouseOver(onTop).mouseOut(onBottom);
        this.button.master = this;
        /*
        this.button.style("border", "2px solid white")
        this.button.style("border-radius","9px")
        this.button.style('font-size', '30px');
        this.button.style("color","white")
        this.button.style('background-color', "black");*/
        this.update = update
        buttonList.push(this)
    }
    set_css(css){
        this.css = css;
        for(let option in this.css){
            this.button.style(option,this.css[option])
        }
    }
    position(x,y){
        this.x = x;
        this.y = y;
        this.button.position(x,y)
    }
    size(w,h){
        this.width = w;
        this.height = h;
        this.button.set_css("width",w)
        this.button.set_css("height",h)
        //this.button.size(w,h)
    }
}
function arrayDifferent(arr1, arr2){
    if(arr1.length != arr2.length){
        return true;
    }else{
        for(var i = 0 ; i < arr1.length ; i++){
            if(arr1[i]!=arr2[i]){
                return true;
            }
        }
    }
    return false;
}