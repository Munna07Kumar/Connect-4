const grid = document.getElementById("grid");
const playerText = document.getElementById("player");
const resetButton = document.getElementById("reset");

let currentPlayer = 1;
let board = [];
let cells = [];

for(let i = 0 ; i < 6 ; i++){
    board[i] = Array(7).fill(0);
}

for(let i = 0 ; i < 42 ; i++){
    let cell = document.createElement("div");
    cell.classList.add("cell");
    let button = document.createElement("button");
    button.classList.add("btn");
    button.dataset.index = i;

    button.addEventListener("click" , handleClick);
    cell.appendChild(button);
    grid.appendChild(cell);
    cells.push(button)
}

//handle click

function handleClick(e){
    let index = parseInt(e.target.dataset.index);
    let row = Math.floor(index / 7);
    let col = index % 7;
    if(board[row][col] !== 0) return;

    if(currentPlayer === 1){
        e.target.classList.add("player1");
        board[row][col] = 1;
        currentPlayer = 2;
        playerText.textContent = "Player 2"
    }
    else {
        e.target.classList.add("player2");
        board[row][col] = 2;
        currentPlayer = 1;
        playerText.textContent = "Player 1";
    }
    e.target.disabled = true;

    //win or lose
    if(checkWin(row,col)){
        setTimeout(() =>{
            alert("Player" +(currentPlayer === 1?2 : 1) +" " + "Wins");
            resetGame();
        },100)
    }
}

function checkWin(row,col){
    let player = board[row][col];
    return(
        checkdirection(row,col,player,0,1) ||  checkdirection(row,col,player,1,0) ||  checkdirection(row,col,player,1,1) ||  checkdirection(row,col,player,1,-1)
    );
}

function checkdirection(row,col,player,drow,dcol){
    let count = 1;
    for(let i = 1 ; i < 4 ; i++){
        let r = row+drow*i;
        let c = col+dcol*i;
        if(r < 0 || r >= 6 || c < 0 || c >= 7 || board[r][c] !== player) 
            break;
        count++;
    }
    for(let i = 1 ; i < 4 ; i++){
        let r = row - drow*i;
        let c = col - dcol*i;
        if(r < 0 || r >= 6 || c < 0 || c >= 7 || board[r][c] !== player)
            break;
        count++;
    }
    return count >= 4;
}

function resetGame(){
    board = [];
    for(let i = 0 ; i < 6 ; i++){
        board[i] = Array(7).fill(0);
    }
    cells.forEach(cell => {
        cell.classList.remove("player1" , "player2");
        cell.disabled = false;
    })
    currentPlayer = 1;
    playerText.textContent = "Player 1";
}

resetButton.addEventListener("click" , resetGame);