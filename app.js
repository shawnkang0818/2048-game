/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
//hold each grid in the board

//hold score 
let board =[[], [], [], []]
let score = 0
let rows = 4
let colmns = 4
let idx = 0


/*------------------------ Cached Element References ------------------------*/
const gridEls = document.querySelectorAll(".grid")
/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/
//setup board, add all initiate value to each grid
//generate randome Integer in order to choose index 

window.onload = function(){
    init();
}

function init(){
    board = [
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    //iteral the board to update the grid data 
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < colmns; c++) {
            let num = board[r][c];
            let grid = document.querySelector(`#g${r}${c}`)
            updateGridStyle(grid, num);
        }
    }
    //create 2 to begin the game
}

function updateGridStyle(grid, num){
    //clear the value of grid
    grid.innertext = ""
    //clear the class list of grid
    grid.classList.value = ""
    //add grid back
    grid.classList.add("grid")
    if(num>0){
        grid.innerText = num
        if(num<4096){
            grid.classList.add(`num${num.toString()}`)
        }
        else{
            grid.classList.add("X8192")
        }
    }
}