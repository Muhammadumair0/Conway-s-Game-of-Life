const gridWidth = 50;
const gridHeight = 25;

function makeBoard(width, height) {
  const nodes = [];
  const size = width * height;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < size; i += 1) {
    if (i % width === 0) {
      const br = document.createElement("br");
      fragment.appendChild(br);
    }

    const id = "box" + i;
    const label = document.createElement("label");
    label.setAttribute("for", id);

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = id;
    nodes.push(checkbox);

    fragment.appendChild(checkbox);
    fragment.appendChild(label);
  }
  board.appendChild(fragment);
  return nodes;
}

/* Make array of booleans. */
function makeGrid() {
  return checkboxes.map(function (checkbox) {
    return Math.random() < 0.25;
  });
}

/* Calculate next generation */
const directions = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
];

function countNeighbours(x, y) {
  let neighbours = 0;
  for (let i = 0; i < 8; i++) {
    const dir = directions[i];
    const dirX = x + dir.x;
    const dirY = y + dir.y;
    if (dirX >= 0 && dirX < gridWidth && dirY >= 0 && dirY < gridHeight) {
      var index = dirX + dirY * gridWidth;
      neighbours += grid[index] ? 1 : 0;
    }
  }
  return neighbours;
}

const size = gridWidth * gridHeight;
function nextGeneration() {
  const newGrid = new Array(size);
  for (let i = 0; i < size; i++) {
    const x = i % gridWidth;
    const y = (i - x) / gridWidth;
    const neighbours = countNeighbours(x, y);
    if (neighbours < 2 || neighbours > 3) {
      newGrid[i] = false;
    } else if (neighbours === 2) {
      newGrid[i] = grid[i];
    } else {
      newGrid[i] = true;
    }
  }
  return newGrid;
}

/* Update board */
function updateBoard() {
  checkboxes.forEach(function (checkbox, index) {
    checkbox.checked = grid[index];
  });
}

/* Single step */
function step() {
  grid = nextGeneration();
  updateBoard();
}

/* Loop and Timer */
let speed = 100;
const stop = false;
function loop() {
  step();
  if (!stop) {
    setTimeout(loop, speed);
  }
}

/* Create board */
const board = $("board");
const checkboxes = makeBoard(gridWidth, gridHeight);
let grid = makeGrid();
updateBoard();
loop();

/* Play Button */
const playBtn = $("play");
playBtn.addEventListener("click", function () {
  if (stop) {
    this.textContent = "Stop";
    stop = false;
    loop();
    return;
  }
  this.textContent = "Play";
  stop = true;
});

/* Next Button */
const nextBtn = $("next");
nextBtn.addEventListener("click", step);

/* New Button */
const newBtn = $("new");
newBtn.addEventListener("click", function () {
  grid = makeGrid();
  updateBoard();
  nextBtn.focus();
});

/* Clear Button */
$("clear").addEventListener("click", function () {
  grid = grid.map(function () {
    return false;
  });
  updateBoard();
  stop = true;
  playBtn.textContent = "Play";
  newBtn.focus();
});

/* Speed control, min - 2 fps, max - 20 fps */
const slider = $("speed");
function logSlider(position) {
  const minp = slider.min;
  const maxp = slider.max;
  const minv = Math.log(500);
  const maxv = Math.log(50);
  const scale = (maxv - minv) / (maxp - minp);
  return Math.ceil(Math.exp(minv + scale * (position - minp)));
}
slider.addEventListener("input", function (event) {
  speed = logSlider(this.value);
});
/* For IE */
slider.addEventListener("change", function (event) {
  speed = logSlider(this.value);
});

board.addEventListener("click", function (event) {
  const target = event.target;
  if (target.tagName === "LABEL") {
    const index = parseInt(target.htmlFor.substring(3), 10);
    grid[index] = !grid[index];
  }
  nextBtn.focus();
});

/* Helper */
function $(id) {
  return document.getElementById(id);
}
