/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
//hold each grid in the board
let board =[[], [], [], []]
let score = 0
let rows = 4
let colmns = 4
let idx = 0
let colToRow =[]
//hold row possible move when gird fill 
let availableGridInRow
//hold column possible move when gird fill 
let availableGrinInCol
//track for game over
let gameOver = true
//track continue after win
let isContinue 
//main audio
audio = new Audio()
//audio
let playBtn, muteBtn, shiftSound
//to enable quick win function
let quickWin = false
let quickLose = false
let shiftLeftAnimation = false
let shiftRightAnimation = false
let shiftUpAnimation = false
let shiftDownAnimation = false
let tempGrid
/*------------------------ Cached Element References ------------------------*/
const message =document.getElementById('over-text')
const coverScreen =document.querySelector('.cover-screen')
const ctnBtn = document.getElementById('continue')
const restartBtn = document.getElementById('restart')
const gameBoard = document.getElementById('board')
/*----------------------------- Event Listeners -----------------------------*/
restartBtn.addEventListener('click', init)
ctnBtn.addEventListener('click', () =>{
    coverScreen.classList.add('hide')
    gameOver = false
    ctnBtn.classList.add('hide')
    isContinue = true
})

document.addEventListener('keyup', (evt) => {
    if(!gameOver){
        if(evt.code == "ArrowLeft" || evt.code == "KeyA"){
            shiftLeftAnimation = true
            updateBoardAfterShiftLeft()
            addNumToGrid()
        }
        else if(evt.code == "ArrowRight" || evt.code == "KeyD"){
            shiftRightAnimation = true
            updateBoardAfterShiftRight()
            addNumToGrid()
        }
        else if(evt.code == "ArrowUp" || evt.code == "KeyW"){
            shiftUpAnimation = true
            updateBoardAfterShiftUp()
            addNumToGrid()
        }
        else if(evt.code == "ArrowDown" || evt.code == "KeyS"){
            shiftDownAnimation =true
            updateBoardAfterShiftDown()
            addNumToGrid()
        }
        soundEffect()
    }else{
        return
    }
    
    
    shiftLeftAnimation = false
    shiftRightAnimation = false
    shiftUpAnimation = false
    shiftDownAnimation = false
    availableGridInRow=availableRow()
    availableGrinInCol=availableCol()
    document.querySelector(".score").textContent = score;
    
})


/*-------------------------------- Functions --------------------------------*/
//setup board, add all initiate value to each grid
//generate randome Integer in order to choose index 
initAudioPlayer()


function runQuickWin(){
    score = 0
    isContinue = false 
    availableGridInRow = true
    availableGrinInCol = true
    gameOver = false
    document.querySelector(".score").textContent = score;
    board = [
        [4, 0 , 2, 2],
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [2, 2, 1024, 1024]
    ]
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < colmns; j++) {
            let num = board[i][j]
            let grid = document.querySelector(`#g${i}${j}`)
            updateGridStyle(grid, num);
        }
    }
}

//
function runQuickLose(){
    score = 0
    isContinue = false 
    availableGridInRow = true
    availableGrinInCol = true
    gameOver = false
    document.querySelector(".score").textContent = score;
    board = [
        [4, 8, 4, 8],
        [16, 4, 8, 16],
        [2, 8, 4, 2],
        [4, 16, 32, 64]
    ]
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < colmns; j++) {
            let num = board[i][j]
            let grid = document.querySelector(`#g${i}${j}`)
            updateGridStyle(grid, num);
        }
    }
}

//check for win if grid number = 2048
function checkForWin(num){
    if(num == 2048){
        removeAnimationClassList()
        //continue game after win
        if(!isContinue){
            victoryEffect()
            gameOver = true
            message.innerHTML = "Congrats! how smart to reach 2048"
            restartBtn.textContent= "Start Again"
            coverScreen.classList.remove('hide')
            ctnBtn.classList.remove('hide')
            ctnBtn.innerText = "Continue"
            audio.pause()
            playBtn.style.background = "url(img/play.svg) no-repeat"
        }
        else{
            return
        }
    }
}

// check for lose, if so , update web page
function checkForLose(){
    if(!availableRow() && !availableCol()){
        removeAnimationClassList()
        loseEffect()
        gameOver = true
        restartBtn.textContent= "Start Again"
        message.innerHTML = "Game Over!"
        coverScreen.classList.remove('hide')
        audio.pause()
        playBtn.style.background = "url(img/play.svg) no-repeat" 
        
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
        if(quickWin){
            runQuickWin()
            quickWin = false
        }else if(quickLose){
            runQuickLose()
            quickLose = false
        }
        else{
            init()
        }
        coverScreen.classList.add('hide')
        restartBtn.textContent = "Restart" 
    })
}
//initialize
function init(){
    score = 0
    isContinue = false 
    availableGridInRow = true
    availableGrinInCol = true
    gameOver = false
    document.querySelector(".score").textContent = score;
 
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
//remove grid classlist vlaue to disable animation
function removeAnimationClassList(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < colmns; j++) {
            let grid = document.querySelector(`#g${i}${j}`)
            grid.classList.remove(animation())
        }   
    }
}
//handle animation of move direction
function animation(){
    if(shiftLeftAnimation == true){
        return 'move-left'
    }else if(shiftRightAnimation == true){
        return 'move-right'
    }else if(shiftUpAnimation == true){
        return 'move-up'
    }else if(shiftDownAnimation == true){
        return 'move-down'
    }
}

function updateGridStyle(grid, num){
    //clear the text of grid
    grid.textContent = ""
    //clear the class list of grid(clear style)
    grid.classList.value = "grid"
    //add classlist value back to grid
    grid.classList.add("grid")
    if(num>0){
        grid.classList.add(animation())
        grid.innerText = num
        
        if(num<=4096){
            grid.classList.add(`num${num.toString()}`)
        }
        else{
            grid.classList.add("num8192")
        }
    }
    checkForWin(num)
}

//remove the index of a row where hold 0.   Ex: [0, 2, 0, 2] - > [2,2]
function removeZero(row){
    return row.filter(num => num != 0)
}

//shift every row
function shift(row){
    //remove 0 before shift
    row = removeZero(row)
    
    for(let i = 0; i<row.length-1; i++){
        //if the value in current index 
        //if it is the same as next one plus them
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
        // a temp array to hold a row [2,0,2,2]
        let row = board[i]
        //return a undated row [4,2,0,0]
        row = shift(row)
        //undate the board row
        board[i] = row

        //handle update each grid
        for(let j = 0; j<4; j++){
            let grid = document.querySelector(`#g${i}${j}`)
            let num = board[i][j]
            updateGridStyle(grid, num)
        }
    }
}
//shift right 
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

//shift up
function updateBoardAfterShiftUp() {
    for(let j = 0; j < colmns; j++){
        //convert column to row
        //[[2],[0],[2],[2]] -> [[2,0,2,2],[],[],[]]
        let row = [
            board[0][j],
            board[1][j],
            board[2][j],
            board[3][j]]
        row = shift(row)
        
        //update board
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
                //grid.classList.add("move-left")
                hasNum = true
            }
        }
    }
    //if there is no empty grid then check possible move
    else if(!hasEmptygrid()) {
        //if either row or column have possible move then keep playing
        if(availableGridInRow === true || availableGrinInCol === true){
            return
        }
        else if(availableGridInRow === false && availableGrinInCol === false){
            checkForLose()
        }
    }
}

//audio and sound effect
function soundEffect(){
    shiftSound = new Audio()
    shiftSound.src = "sound/shift1.mp3"
    shiftSound.volume = 0.2
    shiftSound.playbackRate=3
    if(!audio.muted){
        shiftSound.play()
    }
}

//victory sound effect
function victoryEffect(){
    victory = new Audio()
    victory.src = "sound/victory.mp3"
    victory.volume = 0.3
    if(!audio.muted){
        victory.play()
    }
}
//lose sound effect
function loseEffect(){
    lose = new Audio()
    lose.src = "sound/lose.mp3"
    lose.volume = 0.3
    if(!audio.muted){
        lose.play()
    }
}
// handle background music
function initAudioPlayer(){
    audio.volume = 0.2
    audio.src = "sound/backgroundmusic.mp3"
    audio.loop = true
    audio.muted = true
    audio.pause();
    audio.currentTime = 0;
    // audio.play()
    playBtn = document.getElementById("playPauseBtn")
    muteBtn = document.getElementById('muteBtn')

    playBtn.addEventListener('click', playPause)
    muteBtn.addEventListener('click', mute)
}
// handle play or pause button
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
//handle mute or not
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

