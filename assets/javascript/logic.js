//game variables
var gamestart=false;
var isplayer1=false;
var isplayer2=false;
var player1chosen=false;
var player2chosen=false;
var player1ready=false;
var player2ready=false;
var intervalid;
var interval;
var timerr;
var time=4;
var amount=0;
var player1c=" ";
var player2c=" ";
var player1p=" ";
var player2p=" ";
var clicked;
var dt=0;
const cdown=["ROCK","PAPER", "SCISSORS", "SHOOT"]
var gamen=0;
//firebase
var config = {
    apiKey: "AIzaSyDqhv4zvp5zGJyM-hPrgKmLf95oztDZZho",
    authDomain: "rock-paper-scissors-ded53.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-ded53.firebaseio.com",
    projectId: "rock-paper-scissors-ded53",
    storageBucket: "rock-paper-scissors-ded53.appspot.com",
    messagingSenderId: "492178931883"
};
firebase.initializeApp(config);
var data=firebase.database();
gamenum=1;

if(data.ref('game/player1chosen')===true){
    console.log('good')
}
else if(data.ref('game/player1chosen')===false&&data.ref('game/player2chosen')===true){
    isplayer1=true;
    player1chosen=true;
    save();
}

save()

function save(){
data.ref().set({
    game:{
    gamenum:gamenum,
    player1chosen:player1chosen,
    player2chosen:player2chosen,
    player1ready:player1ready,
    player2ready:player2ready,
    gamestart:gamestart,
    time:time,
    },
    player1:{
    player1c:player1c,            
    player1p:player1p,
    },
    player2:{
    player2c:player2c,
    player2p:player2p,
    }
});
}

// console.log(gamename)


data.ref("game").on("value", function(snapshot){
    player1chosen=snapshot.val().player1chosen;
    player2chosen=snapshot.val().player2chosen;
    gamestart=snapshot.val().gamestart;
    time=snapshot.val().time;
    player1ready=snapshot.val().player1ready; 
    player2ready=snapshot.val().player2ready; 
    if(player2chosen===true&&player1ready!==true&&player2ready!==true){
        checkgs();
    }
    else if(player1ready===true&&player2ready==true&&gamestart===false){
        gamestart=true;
        $("#p1r").addClass("hide")
        $("#waiting").addClass("hide");
        console.log("hi")
        timer();
    }
    console.log(snapshot.val())
});

data.ref('player1').on("value",function(snapshot){
    player1c=snapshot.val().player1c;
    player1p=snapshot.val().player1p;
    console.log(snapshot.val().player1c)
})
data.ref('player2').on("value",function(snapshot){
    player2c=snapshot.val().player2c;
    player2p=snapshot.val().player2p;
    console.log(snapshot.val().player2c)
})

 function player1s(){
data.ref("player1").set({
    player1p:player1p,
    player1c:player1c
})
console.log(player1p, player1c)
}

function player2s(){
data.ref("player2").set({
    player2p:player2p,
    player2c:player2c
})
console.log(player2p, player2c)
}

//events
$("#mainb").on("click",function(){
    event.preventDefault();
    if(player1chosen===false&& player2chosen===false&&isplayer1===false&&isplayer2===false){
    $("#waiting").removeClass("hide");
    $("#rpsp").addClass("hide");
    isplayer1=true;
    player1chosen=true;
    save();
    console.log("isplayer1")
    } 
    else if(player1chosen===true&&player2chosen===false){
        $("#rpsp").addClass("hide");
        isplayer2=true;
        player2chosen=true;
        console.log("isplayer2")
        save();

    }
    else if(player2chosen===true&&player1chosen===true&&isplayer1===false&&isplayer2===false){
        $("#textw").text("game in progress please wait")
        $("#waiting").removeClass("hide");
        $("#rpsp").addClass("hide");
    }
})
$("#ready").on("click", function(){
    event.preventDefault();
    $("#modal1").modal("hide")
    $("#waiting").addClass("hide");
    $("#p1r").text("waiting for both players to be ready")
    $("#p1r").removeClass("hide")
    if(isplayer1){
        player1ready=true
        save();
    } else if(isplayer2){
        player2ready=true;
        save();
    }
});
$('#modal2').on('hidden.bs.modal', function (e) {
    if(dt!==0){
        window.location.reload();
    }
  })
$("#finish").on("click",function(){
    window.location.reload();
})
$(".pics").on("click", function(){
if(gamestart===true){
    if(isplayer1===true&&player1c===" "){
    clicked=$(this)
    $(this).attr("class", "picsc");
    player1c=clicked.attr("data-state");
    }
    else if(isplayer1===true&&player1c!==" "){
        clicked.attr("class","pics");
        clicked=$(this)
        $(this).attr("class", "picsc");
        player1c=clicked.attr("data-state");
    }
    else if(isplayer2===true&&player2c===" "){
        clicked=$(this)
        $(this).attr("class", "picsc");
        player2c=clicked.attr("data-state");

        }
    else if(isplayer2===true&&player2c!==" "){
        clicked.attr("class","pics");
        clicked=$(this)
        $(this).attr("class", "picsc");
        player2c=clicked.attr("data-state");

    }
    if(isplayer1===true){
        player1s()
    }
    else if(isplayer2===true){
        player2s()
    }
} 
else{
    console.log("wait")
}
});


function checkgs(){
    event.preventDefault();
        $("#modal1").modal("show");
        addP();
}
function rounddone(){
    console.log(player1c)
    console.log(player2c) 
    if(player1c==="rock"&&player2c==="paper"){
        winner="player2";
        player2p++;
        $("#count2").append($("<li>"))
        $("#winner").text("p2 win with paper")
        console.log(player2p)
    }
    else if(player1c==="rock"&&player2c==="siss"){
        winner="player1";
        player1p++;
        $("#count1").append($("<li>"))
        $("#winner").text("p1 win by rock")
        console.log(player1p)
    }
    else if(player1c==="paper"&&player2c==="siss"){
        winner="player2";        
        player2p++;
        $("#count2").append($("<li>"))
        $("#winner").text("p2 win with siss")
        console.log(player2p)
    }
    else if(player2c==="rock"&&player1c==="paper"){
        winner="player1";
        player1p++;
        $("#count1").append($("<li>"))
        $("#winner").text("p1 win by paper")
        console.log(player1p)
    }
    else if(player2c==="rock"&&player1c==="siss"){
        winner="player2";
        player2p++;
        $("#count2").append($("<li>"))
        $("#winner").text("p2 win with rock")
        console.log(player2p)
    }
    else if(player2c==="paper"&&player1c==="siss"){
        winner="player1";
        player1p++;
        $("#count1").append($("<li>"))
        $("#winner").text("p1 win by siss");
        console.log(player1p)
    }
    else if(player2c===" "&&player1c===" "){
        $("#winner").text("no one wins")
    }
    else if(player2c===player1c){
        $("#winner").text("Its a tie")
    }
    else if(player2c===" "&&player1c!==" "){
        winner="player1";
        player1p++;
        $("#count1").append($("<li>"))
        $("#winner").text("p1 win by default")
        console.log(player1p)
    }
    else if(player1c===" "&&player2c!==" "){
        winner="player2";
        player2p++;
        $("#count2").append($("<li>"))
        $("#winner").text("p2 win by default")
        console.log(player2p)
    }
    else{
        console.log("no one wins")
    }
    if(player1p===2){
        $("#winner").text("Player 1 won the game!! would you like to try again")
        $("#gamest").text("GAME OVER")
        $("#finish").removeClass("hide")
        dt++
    }
    else if(player2p===2){
        $("#gamest").text("GAME OVER")
        $("#winner").text("Player 2 won the game!! would you like to try again")
        $("#finish").removeClass("hide")
        dt++
    }
    dd(dt)
}
function dd(val){
    clicked.attr("class","pics");
    $("#modal2").modal("show")    
    if(dt===0){
    setTimeout(message,2000)
    }
}
function message(){
    $("#modal2").modal("hide")
    console.log("hi")
    timer();
}

function addP(){
    event.preventDefault();
$("#ppp").removeClass("hide");
$("#rpsp").addClass("hide");
}
function timer(){
    player1c=" ";
    player2c=" ";
    intervalid= setInterval(count,1000)
}
function count(){
    var countd;
    if (amount===4){
        clearInterval(intervalid)
        amount=0;
        $("#timer").text("Press start when ready! ")
        rounddone();
    } 
    else{
        countd=cdown[amount]   
        $("#timer").text(countd)
    amount++;
    }

}