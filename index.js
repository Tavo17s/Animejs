const wrapper = document.getElementById("tiles");

let columns = 0;
let rows = 0;

const colors = [
    "rgb(229, 57, 53)",
    "rgb(253, 216, 53)",
    "rgb(244, 81, 30)",
    "rgb(76, 175, 80)",
    "rgb(33, 150, 243)",
    "rgb(156, 39, 176)"
];

let count = -1;
let backgroundColor = 0;
const handleOnClick = index => {
    count = count + 1;
    backgroundColor = colors[count % (colors.length - 1)];
    wrapper.style.setProperty("--bg", backgroundColor);
    anime({
        targets: ".tile",
        backgroundColor: backgroundColor,
        delay: anime.stagger(50, {
            grid: [columns, rows],
            from: index
        })
    })
}

const createTile = (index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.onclick = e => handleOnClick(index);
    return tile;
}

const createTiles = (quantity) => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    wrapper.innerHTML = "";
    
    const size = document.body.clientWidth > 800 ? 100 : 50;
    
    columns = Math.floor(document.body.clientWidth / size);
    rows = Math.floor(document.body.clientHeight / size);
    
    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    
    createTiles(columns * rows);
  }

createGrid();

window.onresize = () => createGrid();