/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
//hold each grid in the board
let board =[[], [], [], []]
let score = 0
let rows = 4
let colmns = 4
let idx = 0


/*------------------------ Cached Element References ------------------------*/
const gridEls = document.querySelectorAll(".grid")
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('keyup', (evt) => {
    if(evt.code == "ArrowLeft"){
        updateBoardAfterShiftLeft()
        addNumToGrid()
    }
    else if(evt.code == "ArrowRight"){
        updateBoardAfterShiftRight()
        addNumToGrid()
    }
    else if(evt.code == "ArrowUp"){
        updateBoardAfterShiftUp()
        addNumToGrid()
    }
    else if(evt.code == "ArrowDown"){
        updateBoardAfterShiftDown()
        addNumToGrid()
    }
    document.querySelector(".score").textContent = score;
    
})


/*-------------------------------- Functions --------------------------------*/
//setup board, add all initiate value to each grid
//generate randome Integer in order to choose index 

window.onload = function(){
    init();
}

function init(){
    // board = [
    //     [4, 0 , 2, 2],
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [2, 2, 2048, 0]
    // ]
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    //iteral the board to update the grid data 
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < colmns; j++) {
            let num = board[i][j]
            let grid = document.querySelector(`#g${i}${j}`)
            updateGridStyle(grid, num);
        }
    }
    //create 2 to begin the game
    addNumToGrid()
    addNumToGrid()

}

function updateGridStyle(grid, num){
    //clear the value of grid
    grid.textContent = ""
    //clear the class list of grid(clear style)
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

//remove the index of a row where hold 0.   Ex: [0, 2, 0, 2] - > [2,2]
function removeZero(row){
    return row.filter(num => num != 0)
    
}

function shift(row){
    //remove value 0 before shift
    row = removeZero(row)
    
    for(let i = 0; i<row.length-1; i++){
        //if the value in current index 
        //is the same as the next one plus them
        //[2,2,2] -> [4,0,2]
        if(row[i] == row[i+1]){
            row[i] += row[i]
            //clear the value in next index
            row[i+1] = 0
            score += row[i]
        }
    }
    //remove 0 again after no matter what
    //if there was nothing add up, 
    //here is not going to do anything
    row = removeZero(row)

    //add 0 back to the end after add up
    while(row.length < 4){
        row.push(0)
    }
    return row
}

//shift left
function updateBoardAfterShiftLeft(){
    for(let i=0; i<rows; i++ ){
        //a temporary array to hold current values 
        //in a row before shift
        let row = board[i]
        //get value after shifted a row 
        row = shift(row)
        //push the value back to the board row
        board[i] = row

        //update board 
        for(let j = 0; j<4; j++){
            let grid = document.querySelector(`#g${i}${j}`)
            let num = board[i][j]
            updateGridStyle(grid, num)
        }

    }
}
//shit right 
function updateBoardAfterShiftRight(){
    for(let i=0; i<rows; i++ ){
        let row = board[i]
        //[2,0,2,2] -> [2,2,0,2]
        row.reverse()
        row = shift(row)
        row.reverse()
        board[i] = row

        //update board 
        for(let j = 0; j<4; j++){
            let grid = document.querySelector(`#g${i}${j}`)
            let num = board[i][j]
            updateGridStyle(grid, num)
        }

    }
}

//shit up
function updateBoardAfterShiftUp() {
    for(let j = 0; j < colmns; j++){
        //[[2],[0],[2],[2]] -> [[2,0,2,2],[],[],[]]
        let row = [
            board[0][j],
            board[1][j],
            board[2][j],
            board[3][j]
        ]
        row = shift(row)

        for(let i = 0; i < rows; i++){
            board[i][j] = row[i]
            let num = board[i][j]
            let grid = document.querySelector(`#g${i}${j}`)
            updateGridStyle(grid, num)
        }
    }
}  
function updateBoardAfterShiftDown() {
    for(let j = 0; j < colmns; j++){
        //[[2],[0],[2],[2]] -> [[2,0,2,2],[],[],[]]
        let row = [
            board[0][j],
            board[1][j],
            board[2][j],
            board[3][j]
        ]
        // [[2,0,2,2],[],[],[]] -> [[2,2,0,2],[],[],[]]
        row.reverse()
        row = shift(row)
        row.reverse()
        for(let i = 0; i < rows; i++){
            board[i][j] = row[i]
            let num = board[i][j]
            let grid = document.querySelector(`#g${i}${j}`)
            updateGridStyle(grid, num)
        }
    }
}  
// check if there is any empty grid
function hasEmptygrid() {
    let count = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < colmns; j++) {
            if (board[i][j] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}
//add a 2 to random grid
function addNumToGrid(){
    if(!hasEmptygrid()){
        return 
    }
    let hasNum = false
    //keep searching a empty grid while until it add a 2 in a grid
    while (!hasNum){
        let row = Math.floor(Math.random() * rows)
        let colmn = Math.floor(Math.random() * colmns)
        if(board[row][colmn] == 0){
            board[row][colmn] = 2;
            let grid = document.querySelector(`#g${row}${colmn}`)
            grid.textContent = "2"
            grid.classList.add("num2")
            hasNum = true
        }
    }
}
