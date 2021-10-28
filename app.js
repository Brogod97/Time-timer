const btnPlay = $("#btn-play"),
  btnPause = $("#btn-pause"),
  btnRefresh = $("#btn-refresh"),
  btnMinus = $("#btn-minus"),
  btnPlus = $("#btn-plus"),
  txtMinute = $("#minutes");

const beepSound = new Audio("sound/beep-sound.mp3");

let minute = 30, // default value
  remainTime,
  timer,
  run = false;

const canvas = document.getElementById("remain-time");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#ff0000";
ctx.lineWidth = 80;

btnPause.hide();
setMinutes();

btnMinus.on("click", clickMinus);
btnPlus.on("click", clickPlus);
btnPlay.on("click", clickPlay);
btnPause.on("click", clickPause);
btnRefresh.on("click", clickRefresh);
document.querySelector("#minutes").addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    let inputNum = document.getElementById("minutes").value;
    minute = inputNum;
    remainTime = inputNum * 60;
    drawArk();
  }
});

function setMinutes() {
  txtMinute.text(minute);
  remainTime = minute * 60;
  if (minute === 60) remainTime--;
  drawArk();
}

function clickMinus() {
  if (minute > 1) minute--;
  $("input:text").attr("value", minute);
  clickPause();
  setMinutes();
}

function clickPlus() {
  if (minute < 60) minute++;
  $("input:text").attr("value", minute);
  clickPause();
  setMinutes();
}
function clickPlay() {
  run = true;
  btnPlay.hide();
  btnPause.show();
  timer = setInterval(runTimer, 1000); // speed
}
function clickPause() {
  run = false;
  btnPlay.show();
  btnPause.hide();
  clearInterval(timer);
  $(".time-timer").removeClass("blink");
  beepSound.pause();
}
function clickRefresh() {
  clickPause();
  setMinutes();
}

function drawArk() {
  let remainPercent = (60 * 60 - remainTime) / (60 * 60);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(
    110,
    110,
    70,
    1.5 * Math.PI + remainPercent * (2 * Math.PI),
    1.5 * Math.PI
  );
  ctx.stroke();
}

function runTimer() {
  if (remainTime === 0) {
    clearInterval(timer);
    $(".time-timer").addClass("blink");
    beepSound.play();
  } else {
    remainTime--;
    drawArk();
  }
}
