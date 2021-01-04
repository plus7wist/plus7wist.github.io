let start;
let startPoint;
let endPoint;

function onWindowLoad() {
  startPoint = document.getElementById("start-point");
  endPoint = document.getElementById("end-point");
  start = document.getElementById("start");

  start.onclick = onStartClick;
  startWidth = start.clientWidth;
}

function onStartClick(clickEvent) {
  let x = clickEvent.layerX;
  // let y = clickEvent.layerY;

  startPoint.style.left = `${x}px`;
  endPoint.style.left = `${x}px`;

  let missingMinutes = (x / start.clientWidth) * 1.5 * 60;
  missingMinutes = Math.floor(missingMinutes);

  let startMinutes = 8 * 60 + 30 + missingMinutes;
  let hour = Math.floor(startMinutes / 60);
  let minute = startMinutes % 60;

  document.getElementById("start-hour").innerText = `${hour}`;
  document.getElementById("start-minute").innerText = `${minute}`;

  startMinutes = 7 * 60 + missingMinutes;
  hour = Math.floor(startMinutes / 60);
  minute = startMinutes % 60;

  document.getElementById("end-hour").innerText = `${hour}`;
  document.getElementById("end-minute").innerText = `${minute}`;
}

window.onload = onWindowLoad();
