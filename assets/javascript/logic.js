//game variables
var gamestart=false;
var isplayer1=false;
var isplayer2=false;
var player1chosen=false;
var player2chosen=false;
var player1ready=false;
var player2ready=false;
var intervalid;
var timerr;
var time=4;
var amount=0;
var player1c="";
var player2c="";
var player1p=0;
var player2p=0;
const cdown=["ROCK","PAPER", "SCISSORS", "SHOOT",]
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
if(data.player1in===true){
    player1chosen=data.player1in;
}
else{
  save();
}
function save(){
    data.ref().set({
        player1in:player1chosen,
        player2in:player2chosen,
        gamestart:gamestart,
        player1ready:player1ready,
        player2ready:player2ready,
        time:time,
        player1c:player1c,
        player2c:player2c,
        player1p:player1p,
        player2p:player2p
});
} 
data.ref().on("value", function(snapshot){
    player1chosen=snapshot.val().player1in;
    player2chosen=snapshot.val().player2in;
    gamestart=snapshot.val().gamestart;
    player1p=snapshot.val().player1p;
    player2p=snapshot.val().player2p;
    player1c=snapshot.val().player1c;
    player2c=snapshot.val().player2c;
    player1ready=snapshot.val().player1ready;
    player2ready=snapshot.val().player2ready
    // console.log(snapshot.val());
    if(player1ready===true&&player2ready==true&&gamestart===false){
        $("#p1r").addClass("hide")
        $("#waiting").addClass("hide");
        console.log("hi")
        timer();
    } else if(player2chosen===true&&player1ready!==true&&player2ready!==true){
        checkgs();
    }
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
//events
$("#mainb").on("click",function(){
    event.preventDefault();
    if(player2chosen===true&&player1chosen===true&&isplayer1===false&&isplayer2==false){
        $("#textw").text("game in progress please wait")
        $("#waiting").removeClass("hide");
        $("#rpsp").addClass("hide");
        console.log("r")
    }
    else if(player1chosen===false&& player2chosen===false){
    isplayer1=true;
    player1chosen=true;
    $("#waiting").removeClass("hide");
    $("#rpsp").addClass("hide");
    console.log("isplayer1")
    } 
    else if(player1chosen===true&&player2chosen===false){
        isplayer2=true;
        player2chosen=true;
        $("#rpsp").addClass("hide");
        console.log("isplayer2")
    }
    save();
})
$("#ready").on("click", function(){
    event.preventDefault();
    $("#modal1").modal("hide")
    $("#waiting").addClass("hide");
    $("#p1r").text("waiting for both players to be ready")
    $("#p1r").removeClass("hide")
    if(isplayer1){
        player1ready=true
    } else if(isplayer2){
        player2ready=true;
    }
    save();
});

$(".pics").on("click", function(){
    event.preventDefault();
    if(isplayer1===true&&player1c===""){
    player1c=$(this)
    $(this).attr("class", "picsc");
    player1c=player1c;
    }
    else if(isplayer1===true&&player1c!==""){
        player1c.attr("class","pics");
        player1c=$(this)
        $(this).attr("class", "picsc");
        player1c=player1c;

    }
    else if(isplayer2===true&&player2c===""){
        player2c=$(this)
        $(this).attr("class", "picsc");
        player2c=player2c;

        }
    else if(isplayer2===true&&player2c!==""){
        player2c.attr("class","pics");
        player2c=$(this)
        $(this).attr("class", "picsc");
        player2c=player2c;

    }

});
//game functions
function checkgs(){
        $("#modal1").modal("show");
        addP();
}

function rounddone(){
    if(isplayer1===true){
        player1c=player1c.attr("data-value")
    } 
    else if(isplayer2===true){
        player2c=player2c.attr("data-value")
    }
    console.log(player1c)
    console.log(player2c)
    save();
    if(player2c===""&&player1c===""){
        console.log("no one wins")
    }
    else if(player2c===""&&player1c!==""){
        player1p++;
        $("#count1").append($("<li>"))
        console.log("p1 win by default")
    }
    else if(player1c===""&&player2c!==""){
        player2p++;
        $("#count2").append($("<li>"))
        console.log("p2 win by default")
    }
    else if(player1c==="rock"&&player2c==="paper"){
        player2p++;
        $("#count2").append($("<li>"))
        console.log("p2 win with paper")
    }
    else if(player1c==="rock"&&player2c==="siss"){
        player1p++;
        $("#count1").append($("<li>"))
        console.log("p1 win by rock")
    }
    else if(player1c==="paper"&&player2c==="siss"){
        player2p++;
        $("#count2").append($("<li>"))
        console.log("p2 win with siss")
    }
    else if(player2c==="rock"&&player1c==="paper"){
        player1p++;
        $("#count1").append($("<li>"))
        console.log("p1 win by paper")
    }
    else if(player2c==="rock"&&player1c==="siss"){
        player2p++;
        $("#count2").append($("<li>"))
        console.log("p2 win with rock")
    }
    else if(player2c==="paper"&&player1c==="siss"){
        player1p++;
        $("#count1").append($("<li>"))
        console.log("p1 win by siss")
    }
    else{
        console.log("no one wins")
    }
    // if(player1p>4||player2p>4){
    //     gamedone();
    // }
save();
}
// function gamedone(){

// }
function addP(){
$("#ppp").removeClass("hide");
$("#rpsp").addClass("hide");
}
function timer(){
    gamestart=true;
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