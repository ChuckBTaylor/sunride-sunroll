const sunride = document.getElementById('sunride');
const ctx = sunride.getContext("2d");
let c = 0;
// document.getElementById('cycle').addEventListener('click', cycle);

function fromMouseOver(hour) {
  ctx.clearRect(0, 0, sunride.width, sunride.height);

  if (hour <= 7 && hour > 4) {drawDawn();} else
  if (hour <= 10 && hour > 7) {drawMidMorning();} else
  if (hour <= 14 && hour > 10) {drawNoon();} else
  if (hour <= 18 && hour > 14) {drawMidAfternoon();} else
  if (hour <= 21 && hour > 18) {drawDusk();}
  else {drawNight();}

  // switch (c) {
  //   case 0 : drawDawn(); c++; break;
  //   case 1 : drawMidMorning(); c++; break;
  //   case 2 : drawNoon(); c++; break;
  //   case 3 : drawMidAfternoon(); c++; break;
  //   case 4 : drawDusk(); c++; break;
  //   case 5 : drawnNight(); c = 0; break;
  // }
};

function drawDawn() {
  const grd = ctx.createRadialGradient(25, 300, 20, 25, 300, 35);
  grd.addColorStop(0, "#e5c352");
  grd.addColorStop(1, "#404159");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, sunride.width, sunride.height);

  // ctx.fillStyle = '#404159';
  // ctx.fillRect(0, 0, sunride.width, sunride.height);
  // ctx.fill();

  // ctx.fillStyle = '#e5c352';
  // ctx.beginPath();
  // ctx.arc(25, 300, 35, 0, 2*Math.PI);
  // ctx.fill();
};

function drawMidMorning() {
  const grd = ctx.createRadialGradient(200, 150, 20, 200, 150, 35);
  grd.addColorStop(0, "#eacc46");
  grd.addColorStop(1, "#41607f");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, sunride.width, sunride.height);

  // ctx.fillStyle = '#41607f';
  // ctx.fillRect(0, 0, sunride.width, sunride.height);
  // ctx.fill();

  // ctx.fillStyle = '#eacc46';
  // ctx.beginPath();
  // ctx.arc(212, 150, 35, 0, 2*Math.PI);
  // ctx.fill();
};

function drawNoon() {

  const grd = ctx.createRadialGradient(400, 100, 20, 400, 100, 37);
  grd.addColorStop(0, "#efce28");
  grd.addColorStop(1, "#5493ce");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, sunride.width, sunride.height);


  // ctx.fillStyle = '#5493ce';
  // ctx.fillRect(0, 0, sunride.width, sunride.height);
  // ctx.fill();

  // ctx.fillStyle = '#efce28';
  // ctx.beginPath();
  // ctx.arc(400, 100, 35, 0, 2*Math.PI);
  // ctx.fill();
};

function drawMidAfternoon() {
  const grd = ctx.createRadialGradient(600, 150, 20, 600, 150, 35);
  grd.addColorStop(0, "#ddbc37");
  grd.addColorStop(1, "#4b74c1");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, sunride.width, sunride.height);

  // ctx.fillStyle = '#4b74c1';
  // ctx.fillRect(0, 0, sunride.width, sunride.height);
  // ctx.fill();

  // ctx.fillStyle = '#ddbc37';
  // ctx.beginPath();
  // ctx.arc(650, 150, 35, 0, 2*Math.PI);
  // ctx.fill();
}

function drawDusk() {
  const grd = ctx.createRadialGradient(774, 300, 20, 774, 300, 35);
  grd.addColorStop(0, "#c69f33");
  grd.addColorStop(1, "#404159");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, sunride.width, sunride.height);

  // ctx.fillStyle = '#404159';
  // ctx.fillRect(0, 0, sunride.width, sunride.height);
  // ctx.fill();

  // ctx.fillStyle = '#c69f33';
  // ctx.beginPath();
  // ctx.arc(774, 300, 35, 0, 2*Math.PI);
  // ctx.fill();
}

function drawNight() {
  ctx.fillStyle = '#191938';
  ctx.fillRect(0, 0, sunride.width, sunride.height);
  ctx.fillStyle = '#d1d0cf'
  for(let i=0; i<50; i++) {
    let x = Math.round(Math.random() * 800);
    let y = Math.round(Math.random() * 300);
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2*Math.PI);
    ctx.fill();
  }
}
