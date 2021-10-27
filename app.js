const btnPlay = $("#btn-play"),
  btnPause = $("#btn-pause"),
  btnRefresh = $("#btn-refresh"),
  btnMinus = $("#btn-minus"),
  btnPlus = $("#btn-plus"),
  txtMinute = $("#minutes");

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
btnRefresh.on("click", clicRefreshs);

function setMinutes() {
  txtMinute.text(minute);
  remainTime = minute * 60;
  if (minute === 60) remainTime--;
  drawArk();
}

function clickMinus() {
  if (minute > 1) minute--;
  clickPause();
  $("input:text").attr("placeholder", minute);
  setMinutes();
}

function clickPlus() {
  if (minute < 60) minute++;
  clickPause();
  setMinutes();
  $("input:text").attr("placeholder", minute);
}
function clickPlay() {
  run = true;
  btnPlay.hide();
  btnPause.show();
  timer = setInterval(runTimer, 10); // speed
}
function clickPause() {
  run = false;
  btnPlay.show();
  btnPause.hide();
  clearInterval(timer);
  $(".time-timer").removeClass("blink");
}
function clicRefreshs() {
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
  } else {
    remainTime--;
    drawArk();
  }
}
