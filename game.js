
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keypress(function()
{

  if(started==false)
  {started=true;
  $("#level-title").text("Level "+level);nextSequence();}

});
$(document).on("tap",function()
{

  if(started==false)
  {started=true;
  $("#level-title").text("Level "+level);nextSequence();}

});
$(".btn").click(function()
{
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});






function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
  {
    console.log("success");

  if(userClickedPattern.length===gamePattern.length)
  {
    setTimeout(function()
  {
    nextSequence();
  },1000);
}
}
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");},200);

$("#level-title").text("Game Over, Press Any Key to Restart");
startOver();
  }

}
function nextSequence()
{
  userClickedPattern=[];
  level++;
  highScore(level);
    $("#level-title").text("Level "+level);
var randomNumber=(Math.floor(Math.random()*4));
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}
function playSound(name)
{
  var audio=new Audio("sounds/"+ name +".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function()
{
  $("#"+currentColour).removeClass("pressed");

},100);


}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}

function highScore(score) {
   var saved = 0;
   try { saved = parseFloat(localStorage.highScore); } catch (e) { saved = 0; }
   if (!(typeof score === 'undefined')) {
      try { score = parseFloat(score); } catch (e) { score = 0; }
      if (score>saved) {
        saved = score;
        localStorage.highScore = '' + score;
      }
   }
   if (isNaN(saved)) {
      saved = 0;
      localStorage.highScore = '0';
   }
     $("#high-score").text("High Score:"+saved);
}
