function sendMsg(msgName="none", data={}){
    data.msgName = msgName;
    socket.emit("Data",data)
}

function DataHandle(data){
    switch(data.msgName){
        case "player_update":
            var id = data.id;
            var name = data.name;
            var index = data.index;
            var points = data.points
            var p = get_player(id);
            if(p==undefined){
                var p = create_player(id,name)
            }
            p.id = id;
            p.name = name;
            p.index = index;
            p.points = points;
        break;
        case "wait_start":
            value.waiting = true;
            console.log("wait start");
            if(value.admin==true){
                request_rank();
                console.log("requested rank")
            }
        break;
        case "wait_end":
            value.waiting = false;
            value.correct_answer = -1;
            value.selectingOption = -1;
        break;
        case "self_update":
            var id = data.id;
            playerData.id = id;
            console.log("update: "+id);
            playerData.points = data.points
            
        break;
        case "player_answer_update":
            var id = data.id;
            var answer = data.answer;
            var p = get_player(id);
            if(p!=undefined){
                p.answer = answer;
            }
        break;
        case "update_answer_percent":
            var percentageList = data.percentageList;
            value.answerPercentageList = percentageList;
        break;
        case "correct_answer":
            var answer = data.answer;
            value.correct_answer = answer;
            console.log(answer);
        break;
        case "question_update":
            var questionString = data.questionString;
            var questionOptions = data.questionOptions;
            value.questionString = questionString;
            if(!value.admin){
                console.log(value.admin)
                updateOptionDisplay();
            }
            value.questionOptions = questionOptions;
        break;
        case "restart":
            value = {
                questionString:"",
                questionOptions:[],
                time:0,
                set_time:100000,
                selectingOption:-1,
                correct_answer:-1,
                game_end:false,
            }
            for(var p of playerList){
                p.points = 0;
            }
        break;
        case "game_end":
            value.game_end = true;
        break;
        case "get_rank":
            var r = data.rank;
            rank = r;
            console.log("rank: "+rank);
        break;
        case "player_remove":
            var id = data.id;
            var p = get_player(id);
            if(p!=undefined){
                p.remove();
            }
            console.log(data.x,data.y)
        break;
        case "set_time":
            value.time = data.time;
            value.set_time = data.set_time
        break;
        default:
            console.log("unknown data received: "+data);
        break;
    }
}