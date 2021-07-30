var gamePattern = [];
var userSequence = [];
var level = 0;

var colours = ["red","blue","green","yellow"];
var started = false;

$(document).keydown(function(){
  if (!started){
    $("#level-title").text("level"+" "+ level);
    nextSequence();
    started= true;
    
  }
})


$(".btn").click(function(){
var userChosenColor = $(this).attr("id");
userSequence.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userSequence.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userSequence[currentLevel]){
    if(userSequence.length === gamePattern.length){
      setTimeout(function(){ 
        nextSequence();
      },1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over press any key to restart");
    
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
  
}


function nextSequence(){
  level++;
$("#level-title").text("level"+" "+ level);
  userSequence=[];
  var randomNumber = Math.floor(Math.random()*4);
   var randomColor = colours[randomNumber];
  gamePattern.push(randomColor);
$("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomColor);

}

function animatePress(color){
$("#"+color).addClass("pressed");
setTimeout(function(){
$("#"+color).removeClass("pressed");
},200)

}


function playSound(name){
  var name = new Audio("sounds/"+ name + ".mp3")
  name.play();
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
