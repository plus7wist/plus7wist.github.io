function main() {
  const domCtrl = newDomControl();

  domCtrl.createGrid();

  const table = createTable(domCtrl);

  const btn = document.querySelector("#btn-start");

  btn.onclick = table.onStartClick;
}

function newDomControl() {
  const canvas = document.querySelector("#canvas");
  const info = document.querySelector("#info");

  function createGrid() {
    let html = [];
    for (let row = 0; row < 5; row += 1) {
      let rowHtml = [];
      for (let col = 0; col < 5; col += 1) {
        rowHtml.push('<span class="cell"></span>');
      }
      rowHtml = rowHtml.join("");
      html.push(`<div class="row">${rowHtml}</div>`);
    }
    html = html.join("");
    canvas.innerHTML = html;
  }

  function forEachCanvasCell(onCell) {
    canvas.childNodes.forEach((row) => {
      row.childNodes.forEach(onCell);
    });
  }

  function infoTimeUsed(delta) {
    info.innerHTML = `完成，用时：${delta}秒`;
  }

  function infoToBeClick(toBeClick) {
    info.innerHTML = `接下来点击：${toBeClick}`;
  }

  return {
    forEachCanvasCell,
    createGrid,
    infoTimeUsed,
    infoToBeClick,
  };
}

function createTable(domCtrl) {
  const table = [];
  let startTime = null;
  let toBeClick = 1;

  for (let i = 1; i <= 25; i++) {
    table.push(i);
  }

  function shuffle() {
    table.sort((_first, _second) => 0.5 - Math.random());
  }

  function getUsedTimeSeconds() {
    if (startTime === null) {
      return 0.0;
    }
    return (new Date() - startTime) / 1000.0;
  }

  function onStartClick(event) {
    const button = event.target;
    button.disabled = true;

    startTime = new Date();
    toBeClick = 1;

    shuffle();

    let i = 0;

    domCtrl.forEachCanvasCell((cell) => {
      const currentValue = table[i];
      cell.innerHTML = currentValue.toString();
      cell.onclick = (_event) => {
        if (toBeClick !== currentValue) {
          return;
        }

        toBeClick += 1;

        if (toBeClick <= 25) {
          domCtrl.infoToBeClick(toBeClick);
        } else {
          domCtrl.infoTimeUsed(getUsedTimeSeconds());
        }
      };

      i += 1;
    });

    domCtrl.infoToBeClick(toBeClick);
    button.disabled = false;
  }

  return { onStartClick };
}

main();
