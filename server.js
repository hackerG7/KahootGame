var AdminCode = "IAMTHEADMING7"
var fs = require("fs");
window = undefined;
function read(f) {
  return fs.readFileSync(f).toString();
}
function include(f) {
  eval.apply(global, [read(f)]);
}
if (/^win/.test(process.platform)) {
    console.warn('Starting uws bug-hack interval under Windows');
    setInterval(() => {}, 50);
}
include("D:/XAMPP/htdocs/GK.js")
var express = require("express");
var value_port = 569;
var app = express();
var server = app.listen(value_port);

app.use(express.static("public"));
console.log("server starting on localhost:"+value_port);

var socket = require("socket.io");
var io = socket(server);
function sendMsgToAll(msgName, data){
    data.msgName = msgName;
    io.emit("Data",data)
}//sendMsgToAll("update",{date:"12/13/15"})
function sendMsgToRoom(roomID, msgName, data){
    data.msgName = msgName;
    io.to(roomID).emit("Data",data)
}//sendMsgToAll("update",{date:"12/13/15"})

function get_player(id){
    return playerList.find(x => x.id===id);
}
function get_Room_by_id(roomID){
    return roomList.find(x => x.roomID==roomID);
}
class Question{
    constructor(question,answerList,answerIndex=0){
        this.question = question;
        this.answerList = answerList;
        this.answerIndex = answerIndex
    }
}
class Room{
    constructor(roomID=get_randomID(),maxPlayer = 250){
        this.roomID = roomID;
        this.maxPlayer = maxPlayer;
        this.playerList = [];
                
        //question system//
        this.started = false;
        this.waiting = false;
        this.waiting_time = 0;
        this.set_waiting_time = 300;
        this.questionList = [
            new Question("超級市場裡面有蘋果，有香蕉，有蘿蔔，有狗，沒有什麼?",[
                "沒有蘋果，香蕉，蘿蔔和狗",
                "沒有貓",
                "沒有大笨象",
                "沒有大烏龜"
            ]),
            new Question("在路軌的四岔口上，分別擺放著一個老人，傷殘人士，嬰兒和一個年輕有為的成年人，火車不能停下，你只能選擇走其中一條道路，你會選擇哪一個?",[
                "老人",
                "傷殘人士",
                "嬰兒",
                "成年人"
            ]),new Question("你飛機失事掉了進荒野，迷了路，你拿下了最重要的求生物品，現在剩下了一瓶鹽片，一個電池，一條繩子和一支筆，只能拿其中一個，你會拿什麼?",[
                "鹽片",
                "電池",
                "繩子",
                "筆"
            ]),new Question("你被困在屋子裡面，有一個猥瑣的老人在你身邊，你被鎖上了手扣，到底接下來會發生什麼事?",[
                "猥瑣的老人彈了起來然後跳開心舞",
                "手扣自爆了，然後老人也一起自爆了",
                "你發現了有一隻蜘蛛在老人的嘴邊",
                "屋子的門口打開了"
            ]),new Question("魚峰是一個天才，有一天考試時後他被陳天落抄襲了，但他不知道，你坐在陳天落的正後方，你會怎麼做?",[
                "大叫有人出貓，保護魚峰",
                "大叫有人出貓，誣蔑魚峰作弊",
                "跟陳天落進行交易換取情報",
                "什麼都不做"
            ]),new Question("你的籃球隊教練十分嚴格，只要不出席一次練習就會被踢出隊，但有一次你所負責搞的活動跟籃球隊撞期了，如果你不出席的話一定會被你的同學講壞話，他們也不會明白你，你會怎麼做?",[
                "放棄堅持以久籃球隊，專心搞好活動",
                "出於對籃球隊的尊重，捨棄心愛的活動",
                "什麼都不做，等死",
                "離開這個空間進入另一個可以邊搞活動邊打籃球的平衡時空"
            ]),new Question("燈塔掉下來的時候，但你不能離開掉落範圍，你會躲到哪一個地方去提高你的生存幾率?",[
                "底部落點附近",
                "中間落點附近",
                "頂部落點附近",
                "頂部落點附近"
            ]),new Question("A是A, B是B, C是C, 那D是什麼?",[
                "D是D",
                "D不能不是D",
                "D肯定是D",
                "D一定是D"
            ]),new Question("你在兩個玻璃上前面，一邊是大量的人質，一邊是一個無辜的人，恐怖分子要求你殺一個無辜的人，就可以救出所有的人質，你會怎麼做?",[
                "殺掉無辜的人救下人質",
                "殺掉所有人質救下無辜的人",
                "兩邊都殺掉然後成為他們的一份子",
                "關掉電腦然後責罵這個遊戲的製作團隊"
            ]),new Question("你被困在一個密室，只有有一個按鈕，你按下去全世界都會死掉，按完你可以離開。你會做什麼?",[
                "什麼都不做直接餓死",
                "去拆開這個按鈕進行研究",
                "大叫有冇人呀",
                "按下按鈕"
            ]),new Question("高速公路上有五個傻仔，五個都是傻的，另一條跑道有一個正常人正在分心看手機，兩邊撞下去也是會死的，你會怎麼做?",[
                "直接撞死五個沒有價值的傻仔",
                "轉換跑道犧牲一人救回五人",
                "停車然後大喊幹你娘",
                "無從判斷"
            ]),
            new Question("十六個男生被一個同性戀海賊綁架在船上，只有四個人可以離開，大家手上有四票，可以投自己或別人，最多票的死人可以離開，你會如何做?",[
                "做大聖人，不透自己並把最值得離開的人投下，企圖博取大家同情",
                "拉攏三人和自己互相投大家，保證每人平分四票，提高生存率",
                "用自己的美色引誘海賊並偷取他的武器(請有自知之明)",
                "十六個人一起合力幹掉海賊"
            ]),new Question("餐廳上你的對面有一個美女，手機的電筒亮了但她沒有發現，你會怎麼做?",[
                "坦白跟她說她的手機亮了",
                "騙她說自己會變一個令她的手機電筒亮的魔法",
                "開著自己手機誘導暗示她的手機亮了",
                "因為怕尷尬什麼都不做"
            ]),new Question("有一天你發現林寶堅的書包開了，但是你害怕林寶堅這個癡漢對你的舉動胡思亂想，你會:",[
                "叫旁邊的小美拉上他的書包拉鏈",
                "直接拉上他的書包",
                "跟他說他的書包開了，並叫他不要胡思亂想啊白癡",
                "這條問題很有問題"
            ]),new Question("在堅尼地城的某一棟大樓裡面，升降機的樓層按鈕有一邊是由數字小至大向上推移，另一邊是反轉的，為什麼?",[
                "方便升降機的運作",
                "電路的鏈接需要",
                "設計這部升降機的人的腦部有問題",
                "能夠讓小朋友按到自己想按的按鈕"
            ]),new Question("死亡直播裡面有一個人正在四處尋找逃脫方法，界面上有一個『救他』按鈕和一個『殺他』按鈕還有一個評論區，地面上有一個很大的四位數字，應該是密碼鎖的密碼，但他沒有發現，你會:",[
                "按下『救他』按鈕",
                "按下『殺他』按鈕",
                "在評論區上留言提醒他密碼鎖的事",
                "什麼都不做"
            ]),new Question("你發現女朋友在高級餐廳中賴了屎，但她不知道，你會:",[
                "當什麼都沒看到，繼續食飯",
                "放下尊嚴陪她一起浪漫地賴屎",
                "站起來大叫服務員來幫女朋友清理糞便",
                "問她到底知不知道自己賴了屎"
            ]),new Question("你(不是最好，但ok)的朋友張柏迪因為學業壓力而坐在窗邊打算跳樓，請問你會怎麼做？",[
                "推他下去幫他解脫痛苦人生",
                "勸他不要跳下去",
                "偷偷幫他裝上降落傘",
                "跟他一起跳下去"
            ]),new Question("你的曖昧對象與你的朋友們反面，而你的朋友們明明是錯的，如果你幫你的曖昧對象，你全部朋友也會當你重色輕友，你會怎樣做？",[
                "直接指出你朋友的錯誤",
                "間接指出你兄弟的錯誤",
                "假裝和女朋友反面",
                "選擇和張柏迪一起跳樓"
            ]),new Question("有個自稱外賣仔的人按鈴要求進來，但你沒有叫外賣，你會怎樣做？",[
                "不作出任何回應，假裝沒人在家",
                "打開門讓他進來，然後再跟他說你沒有叫外賣",
                "透過魚眼檢查他是否可疑人物，然後報警",
                "不打開門跟他說你沒有叫外賣"
            ]),new Question("你前面有兩條路，一條能夠通往天國，一條則會掉入地獄，自稱惡魔的說往右邊走會進入天國，自稱天使的則說惡魔總是在說謊，你會怎麼做？",[
                "走左邊",
                "走右邊",
                "尋找其他出路",
                "原地不動"
            ]),new Question("一位黑人叫你幫他拿顏色筆，黑人說要皮膚色的顏色筆，而你是白人，你會給他:",[
                "白色",
                "黑色",
                "白色和黑色",
                "灰色"
            ]),new Question("以前的人對你說晚安是真的要睡，現在的人對你說晚安是什麼意思？",[
                "不要煩我，我要打機",
                "對你有好感",
                "晚安",
                "想你同樣回覆他晚安"
            ]),new Question("你不敢玩高空歷奇，但有個朋友一直慫恿你玩，但是你真的十分害怕，你到底會怎麼做？",[
                "大叫 我不想玩",
                "一哭二鬧不想跳",
                "推你的朋友下去",
                "脫下自己的安全繩索威脅朋友放過自己"
            ]),new Question("你很喜歡高空歷奇，但有個朋友很不敢玩，但你真的很想他玩，你到底會怎麼做？",[
                "放過他",
                "鼓勵他玩",
                "強迫他玩",
                "脫下他的安全繩索威脅他玩"
            ]),new Question("如果在麥當勞的食物裡發現有昆蟲，你會怎麼做？",[
                "打電話投訴",
                "照樣吃下食物",
                "扔進垃圾桶",
                "沒可能的！麥當勞從不添加天然成分！"
            ]),new Question("船上有三個守衛和一個王子，在海上迷失了方向，已經過了三十天還沒有吃過東西，你是守衛現在必須選擇一個人出來去下肉來充飢，你是守衛，你會怎麼做:",[
                "合謀殺掉最肥的那個守衛",
                "自殺",
                "直接殺掉餓昏了的王子",
                "什麼都不做，等死"
            ]),new Question("一個詭異的成年男人在跟蹤你，你會怎麼辦?",[
                "走小徑轉進小巷企圖撇掉男人",
                "躲在一個沒人看到的地方",
                "走到人多的地方",
                "使用防狼電擊棒突襲男人"
            ])
            ,new Question("你與家人與寵物猴子佩佩，不幸地，海嘯來臨，佩佩的腳踝卡在石頭的裂縫裡，你會怎麼辦?",[
                "叫家人幫忙一起幫佩佩逃脫",
                "拋下佩佩，帶家人離開",
                "砍斷佩佩的腳並帶佩佩離開",
                "大吃一驚"
            ]),new Question("試判斷一下句子:林寶堅與陳雅文做的Big game 2 很好玩",[
                "完全正確",
                "部分正確",
                "錯誤",
                "無從判斷"
            ])/*,new Question("",[
                "",
                "",
                "",
                ""
            ])*/
        
        ];
        this.currentQuestionID = 0;
        this.time = 0;
        this.set_time = 300;
        
        this.end = false;
        ///////////////////
        roomList.push(this);
    }
    get_current_question(){
        return this.questionList[this.currentQuestionID];
    }
    sendQuestion(questionString,questionOptions = []){
        sendMsgToRoom(this.roomID,"question_update",{
            questionString:questionString,
            questionOptions:questionOptions
        })
    }
    restart(){
        this.started = false;
        this.waiting = false;
        this.waiting_time = 0;
        this.set_waiting_time = 600;
        this.currentQuestionID = 0;
        this.time = 0;
        this.set_time = 1200;
        this.end = false;
        this.send_restart();
        for(var pID of this.playerList){
            var p = get_player(pID);
            p.points = 0;
            p.sendMsg("self_update",{
                id:p.id,
                points:p.points
            })
        }
        this.start();

    }
    start(){
        if(!this.started){
            this.started = true;
            for(var pID of this.playerList){
            var p = get_player(pID);
                if(p!=undefined){
                    p.sendMsg("self_update",{
                        id:p.id,
                        points:p.points
                    })
                }
            }
        }
    }
    runQuestion(questionID){
        //console.log(questionID);
        var q = this.questionList[questionID];
        this.sendQuestion(q.question, q.answerList);
    }
    add_player(socketID){
        this.playerList.push(socketID)
    }
    remove_player(socketID){
        this.playerList.remove(socketID)
    }
    get_playerIndex(id){
        return this.playerList.indexOf(id);
    }
    startWait(){
        this.waiting_time = 0;
        var q = this.get_current_question();
        if(this.currentQuestionID>this.questionList.length/2){
            var answerID = getLeastAnsweredOption(this.playerList);//多人答就係答案
        }else{
            var answerID = getMostAnsweredOption(this.playerList);
        }
        q.answerIndex = answerID;
        sendMsgToRoom(this.roomID,"wait_start",{});
        for(var pID of this.playerList){
            var p = get_player(pID);
            sendMsgToRoom(this.roomID,"player_answer_update",{
                id:pID,
                answer:p.answer
            })
            if(p.answer==q.answerList[q.answerIndex]){
                p.points+=10;
            }
        }
        
        sendMsgToRoom(this.roomID,"correct_answer",{
            answer:q.answerIndex
        })
        this.waiting = true;
    }
    check_end(){
        if(this.currentQuestionID>=this.questionList.length-1){
                this.end_game();
        }else{
            this.runQuestion(this.currentQuestionID);
            this.currentQuestionID++;
        }
        
    }
    EndWait(){
        this.waiting = false;
        
        sendMsgToRoom(this.roomID,"wait_end",{});
        this.check_end()
        
        this.time = 0;
        //new question
        
    }
    end_game(){
        this.waiting = false;
        this.end = true;
        this.send_game_end();
        //this.restart();
    }
    send_restart(){
        sendMsgToRoom(this.roomID,"restart",{});
    }
    send_game_end(){
        this.sendQuestion("Game End!");
    }
    update(){
        if(this.playerList.length >= this.maxPlayer && !this.started){
            this.start();
        }
        if(this.started){
            if(this.end){
                this.send_game_end();
            }
            if(this.waiting){
                var percentageList = getAnswerPercentage(this.playerList);
                sendMsgToRoom(this.roomID,"set_time",{time:this.waiting_time,set_time:this.set_waiting_time})
                sendMsgToRoom(this.roomID,"update_answer_percent",{percentageList: percentageList});
            }else{
                sendMsgToRoom(this.roomID,"set_time",{time:this.time,set_time:this.set_time});
            }
            if(!this.end){
                
                this.runQuestion(this.currentQuestionID);
            }
            if(this.time<this.set_time){
                if(!this.waiting){
                    this.time++
                }
            }else{

                if(this.currentQuestionID<this.questionList.length && !this.waiting){
                    this.startWait();   
                    console.log("started wait");
                
                }else{

                    this.sendQuestion("Game End!");
                }
                this.time = 0;
            }
            if(this.waiting && !this.end){
                
                if(this.waiting_time<this.set_waiting_time){
                    this.waiting_time++;
                }else{
                    console.log("end wait :"+this.waiting_time+", "+this.set_waiting_time)
                    
                    this.EndWait();
                    this.waiting_time = 0;
                    
                }
            }
        }
    }
}
function getAnswerPercentage(playerList, optionLength=4){
    var totalPlayerCount = playerList.length;
    var optionAmountList = [];
    var answerPercentageList = [];
    for(var i = 0 ; i < optionLength ; i++){//initiate
        optionAmountList.push(0);
        answerPercentageList.push(0);
    }
    for(var i = 0 ; i < playerList.length ; i++){
        var pID = playerList[i];
        var p = get_player(pID);
        if(p.answerIndex!=-1){
            optionAmountList[p.answerIndex]++;
        }
    }
    //make result
    for(var i = 0 ; i < answerPercentageList.length ; i++){
        answerPercentageList[i] = optionAmountList[i]/totalPlayerCount;
    }
    //console.log(playerList)
    //console.log(optionAmountList);
    //console.log(answerPercentageList);
    return answerPercentageList;

}
function getMostAnsweredOption(playerList, optionLength=4){
    var percentageList = getAnswerPercentage(playerList, optionLength);
    var highestOption = -1;
    var highestPercentage = 0;
    for(var i = 0 ; i < percentageList.length ; i++){
        var percentage = percentageList[i];
        if(percentage > highestPercentage){
            highestPercentage = percentage;
            highestOption = i;
        }
    }
    return highestOption;

}
function getLeastAnsweredOption(playerList, optionLength=4){
    var percentageList = getAnswerPercentage(playerList, optionLength);
    var lowestOption = -1;
    var lowestPercentage = 1;
    for(var i = 0 ; i < percentageList.length ; i++){
        var percentage = percentageList[i];
        if(percentage < lowestPercentage && percentage!=0){
            lowestPercentage = percentage;
            lowestOption = i;
        }
    }
    return lowestOption;

}
class Player{
    constructor(socketID,roomID=-1){
        this.id = socketID;
        this.roomID = roomID;
        this.name = "tester";
        this.index = -1;
        this.answerIndex = -1;
        this.answer = "no answer";
        this.points = 0;
        
        playerList.push(this)
    }
    joinRandomRoom(){
            
        for(let i = 0 ; i < roomList.length ; i++){
            let rm = roomList[i];
            if(rm.playerList.length<rm.maxPlayer){
                //join current room
                rm.add_player(this.id)
                this.roomID = rm.roomID
                this.room = rm
                i = roomList.length;
            }
        }
        if(this.roomID==-1){//still didn't find a room, need to create one!
            let rm = new Room(get_randomID())
            rm.add_player(this.id)
            this.roomID = rm.roomID
            this.room = rm;
        }
    }
    remove(){
        playerList.remove(this)
    }
    update(){
        this.index = this.room.get_playerIndex(this.id)
        sendMsgToRoom(this.roomID,"player_update",{
            id: this.id,
            name: this.name,
            index: this.index,
            points:this.points
        })
        
    }
}
let roomList = [];
let playerList = [];

let server_fps = 60;
let timeOut = 1000/server_fps
function loop(){
    for(var r of roomList){
        r.update();
    }
    for(var p of playerList){
        p.update();
    }
    setTimeout(loop, timeOut);
}
setTimeout(loop, timeOut);


io.sockets.on('connection',newConnection);

function newConnection(socket){
    let p = new Player(socket.id,-1);
    p.joinRandomRoom()
    if(p.room!=undefined){
        p.name = socket.id
    }
    {///new Connection action///
        console.log('new connection:' + socket.id);
        console.log("joint room: "+p.roomID);
        socket.join(p.roomID)
        /*sendMsg(0,{
            name:"tester",
            id:socket.id,
            roomID:p.roomID,
            scene_width:scene_width,
            scene_height:scene_height,
            evolutionDataList:evolutionDataList
        })*/
    }
    ///Functions///
    function sendMsg(msgName, data){
        data.msgName = msgName;
        socket.emit("Data",data)
    }//sendMsg("add_value",[a:50,b:20,c:80])
    function broadcast(msgName, data){
        data.msgName = msgName;
        socket.broadcast.emit("Data",data)
        console.log(socket.id)
    }//broadcast("new_player",[player_name:"abcdefg",id:02132,team:"red"])
    function disconnect(){
        io.emit('user disconnected');
        console.log(socket.id+" disconnected")
        sendMsgToRoom(p.roomID,"player_remove",{id:socket.id})
        get_Room_by_id(p.roomID).remove_player(socket.id)
        
        get_player(socket.id).remove()
    }
    function startPlayer(data){
        
    }
    p.sendMsg = sendMsg;
    {///Disconnect///
        socket.on('disconnect', function () {
            disconnect()
        });
    }
    console.log("sent msg")
    p.sendMsg("self_update",{
        id:socket.id,
        points:p.points
    })
    ///Data///
    function DataHandle(data){
        switch(data.msgName){
            case "get_answer":
                var r = p.room;
                if(p!=undefined && !r.waiting){
                    var answerIndex = data.answerIndex;
                    var options = r.get_current_question().answerList;
                    if(answerIndex<options.length){
                        p.answer = options[answerIndex]
                        p.answerIndex = answerIndex;
                    }
                }else{
                    console.log("cannot receive answer, it's waiting now")
                }
            break;
            case "change_name":
                if(p!=undefined){
                    p.name = data.name;
                }
            break;
            case "request_rank":
                if(p!=undefined){
                    var pL = p.room.playerList;
                    var rank = [];
                    for(var pID of pL){
                        var pp = get_player(pID);
                        console.log(pp.points)
                        if(pp!=undefined && pp.name!=AdminCode){
                            if(rank.length<=0){
                                rank.push([pp.name,pp.points]);
                            }else{
                                found = false;
                                for(var i = 0 ; i < rank.length ; i++){
                                    if(pp.points<rank[i][1]){
                                        rank.splice(i,0,[pp.name,pp.points]);
                                        found = true;
                                        i = rank.length
                                    }
                                }
                                if(!found){
                                    rank.push([pp.name,pp.points])
                                }
                            }
                        }
                    }
                    sendMsg("get_rank",{
                        rank:rank
                    })
                }
            break;
            case "restart":
                p.room.restart();
            break;
            case "request_update":
                    p.sendMsg("self_update",{
                        id:socket.id,
                        points:p.points
                    })
            break;
            default:
                console.log("unknown data received: "+data.msgName);
            break;
        }
    }
    socket.on('Data',DataHandle);
    
}
