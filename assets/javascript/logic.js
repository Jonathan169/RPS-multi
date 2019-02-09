var gamestart=false;
var player1=false;
var player2=false;

$("#mainb").on("click",function(){
    if(gamestart===false&&player1===false&&player2===false)
    gamestart=true;
    $("#waiting").removeClass("hide");
    $("#rpsp").addClass("hide");
})