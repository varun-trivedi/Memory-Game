let colours = ["red", "blue", "green", "yellow"];

let seq = [];
let userclicked = [];

let started = false;
let level = 0;
$(document).keypress(function() {
  if(!started)
  {
    nextSequence();
    started = true;
  }
});
function nextSequence()
{
  userclicked = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = colours[randomNumber];
  seq.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}
$(".btn").click(function()
{
  let buttonpressed = $(this).attr("id");
  userclicked.push(buttonpressed);
  pressAnimation(buttonpressed);
  pressSound(buttonpressed);
  check(userclicked.length - 1);

});
function check(reqind)
{
  if(userclicked[reqind] === seq[reqind])
  {
    if(userclicked.length === seq.length)
    {
        $("#level-title").text("You're Correct");
        setTimeout(function(){
          nextSequence();
        },100);
    }
  }
  else
  {
    pressSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    $("#level-title").text("You're Wrong! Click any button to restart!");
    reset();
  }
}
function reset()
{
  started = false;
  level = 0;
  seq = [];
}
function pressAnimation(buttonpressed)
{
  $("#" + buttonpressed).addClass("pressed");
  setTimeout(function(){
    $("#" + buttonpressed).removeClass("pressed");
  },100);
}
function pressSound(buttonpressed)
{
  const myaudio = new Audio("sounds/" + buttonpressed + ".mp3");
  myaudio.play();
}
