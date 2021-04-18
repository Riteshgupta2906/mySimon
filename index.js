var buttonColor=["red","blue","green","yellow"];
var level=0;
var started=false;

var gamePattern=[];
var userClickedPattern=[];



$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

    

});

function checkAnswer(currentLevel)
{
 
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
            
        }
    } 
    else
    {
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over Press Any Key to Restart");
        
        startOver();

    }
}


function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChosenColor);

}



function playSound(name)
{
 var audio=new Audio("sounds/"+ name +".mp3");
 audio.play();
}


function animatePress(currentColor)
{
    $("#"+ currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}



    
    
    function startOver()
    {
       started=false;
       level=0;
       gamePattern=[];
    }







