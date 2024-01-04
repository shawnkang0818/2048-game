/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
//hold each grid in the board
let board =[[], [], [], []]
let score = 0
let rows = 4
let colmns = 4
let idx = 0
let colToRow =[]
let availableGridInRow
let availableGrinInCol
//audio
let playBtn, muteBtn, shiftSound

/*------------------------ Cached Element References ------------------------*/
const message =document.getElementById('over-text')
const coverScreen =document.querySelector('.cover-screen')
//const gridEls = document.querySelectorAll(".grid")

const restartBtn = document.getElementById('restart')
/*----------------------------- Event Listeners -----------------------------*/


restartBtn.addEventListener('click', init)
document.addEventListener('keyup', (evt) => {
    if(evt.code == "ArrowLeft" || evt.code == "KeyA"){
        
        updateBoardAfterShiftLeft()
        // addNumToGrid()
        // soundEffect()
    }
    else if(evt.code == "ArrowRight" || evt.code == "KeyD"){
        
        updateBoardAfterShiftRight()
        // addNumToGrid()
        // soundEffect()
    }
    else if(evt.code == "ArrowUp" || evt.code == "KeyW"){
        
        updateBoardAfterShiftUp()
        // addNumToGrid()
        // soundEffect()
    }
    else if(evt.code == "ArrowDown" || evt.code == "KeyS"){
        
        updateBoardAfterShiftDown()
        // addNumToGrid()
        // soundEffect()
    }
    addNumToGrid()
    availableGridInRow=availableRow()
    availableGrinInCol=availableCol()
    document.querySelector(".score").textContent = score;
    
})


/*-------------------------------- Functions --------------------------------*/
//setup board, add all initiate value to each grid
//generate randome Integer in order to choose index 

// window.onload = function(){
//     init();
// }

// check for lose, if so , update web page
function checkForLose(){
    if(!availableRow() && !availableCol()){
        restartBtn.textContent= "Start Again"
        message.innerHTML = "Game Over!"
        coverScreen.classList.remove('hide')
        console.log('game over')
    }
}
//check by row, check if elemnet from current index equal to nex index
function hasSame(row){
    for(let i = 0; i<row.length-1; i++){
        if(row[i] == row[i+1]){
            return true
        }
    }
    return false
}

//convert columns to row, and keep tracking column to see if it possible to shift
function availableCol(){
    for(let j = 0; j < colmns; j++){
        //[[2],[0],[2],[2]] -> [[2,0,2,2],[],[],[]]
        let row = [
            board[0][j],
            board[1][j],
            board[2][j],
            board[3][j],
        ]
        if(hasSame(row)){
            return true
        }
    }
    return false
}

// keep tracking rows to see if row possible to shift 
function availableRow(){
    for(let i=0; i<rows; i++ ){
        let row = board[i]
        if(hasSame(row)){
            return true
        }
    }
    
    
    return false
    
}


//run Game
render()
function render(){
   restartBtn.textContent = "Start Game" 
   message.textContent = "Press W, A, S, D to Move"
   message.classList.remove('hide')
    restartBtn.addEventListener('click', () =>{
        init()
        coverScreen.classList.add('hide')
        restartBtn.textContent = "Restart" 
    })
}

function init(){
    score = 0
    document.querySelector(".score").textContent = score;
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
    
    initAudioPlayer()
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

//shift evry row
function shift(row){
    //remove 0 before shift
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
            board[3][j]]
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
    if(hasEmptygrid()){
        console.log("has empty grid")
        let hasNum = false
        //keep searching a empty grid until it add a 2 in a grid
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
    else if(!hasEmptygrid()) {
        
        if(availableGridInRow === true || availableGrinInCol === true){
            console.log("no empty board")
            console.log(board)
            return
        }
        else if(availableGridInRow === false && availableGrinInCol === false){
        
            console.log("game over")
            console.log(board)
            checkForLose()
            
        }
    }
}


function soundEffect(){
    shiftSound = new Audio()
    shiftSound.src = "sound/shift1.mp3"
    if(!audio.muted){
        shiftSound.play()
    }
}

function initAudioPlayer(){
    audio = new Audio()
    audio.src = "sound/backgroundmusic.mp3"
    audio.loop = true
    // audio.play()
    playBtn = document.getElementById("playPauseBtn")
    muteBtn = document.getElementById('muteBtn')

    playBtn.addEventListener('click', playPause)
    muteBtn.addEventListener('click', mute)
}
function playPause(){
    if(audio.paused){
        audio.play()
        playBtn.style.background = "url(img/pause.svg) no-repeat"
    }
    else{
        audio.pause()
        playBtn.style.background = "url(img/play.svg) no-repeat"
    }
}
function mute(){
    if(audio.muted){
        audio.muted = false 
        muteBtn.style.background = "url(img/music-f.svg) no-repeat"
    }
    else{
        audio.muted = true
        muteBtn.style.background = "url(img/mute.svg) no-repeat"
    }

}

