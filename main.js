const player_one_symbol = 'X'
const player_two_symbol = 'O'

class test{
  handleSquareClick(event){
    console.log('which squareE id is getting clicked: ')
    console.log(event.target.id)
    this.executeMove(event.target.id)
  }
  
  executeMove(moveIndex){
    if(this.board[moveIndex] == ""){
      this.board[moveIndex] = this.currPlayer;
      this.updateDOM();
      
      if(!this.gameHasWinner()){
        //swap player only when there is no winner yet
      this.currPlayer = (this.currPlayer == player_one_symbol?player_two_symbol:player_one_symbol);
      }
      else{
        alert('Player '+this.currPlayer+' has Won the Game !'+'\n'+'Board is going to get reset....')
        //document.getElementById('txt').innerHTML = 'Player '+this.currPlayer+' has Won the Game !';
        //restart
        setTimeout(this.start.bind(this),2000);
      }
      console.log(this.board)
      //check for Tie logic
      if(!this.gameHasWinner() && this.board[0]!="" && this.board[1]!="" && this.board[2]!="" && this.board[3]!="" && this.board[4]!="" && this.board[5]!="" && this.board[6]!="" && this.board[7]!="" && this.board[8]!=""){
        //tie
        alert('It\'s a Tie')
        setTimeout(this.start.bind(this),500);
      }
    }
  }
  
  updateDOM(){
    let gameBoard = document.getElementById('gameBoard');
    let squareElements = gameBoard.childNodes
    console.log(squareElements);
    squareElements.forEach((element, index) => {
      if(element.innerText != this.board[index]){element.innerText = this.board[index]}
    })
  }
  
  gameHasWinner(){
    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8], //horizontal
      [0,3,6], [1,4,7], [2,5,8], //vertical
      [0,4,8], [2,4,6] //diagonal
    ];
    return winningCombos.find(combo => {
      if(this.board[combo[0]] != "" && this.board[combo[1]] != "" && this.board[combo[2]] != "" && this.board[combo[0]]==this.board[combo[1]] && this.board[combo[1]]==this.board[combo[2]]){
        return true;
      }
      return false;
    });
  }
  
  drawState(){
    document.body.innerHTML = "";
    let gameBoard = document.createElement('div');gameBoard.id = 'gameBoard';gameBoard.classList.add('board');
    
    gameBoard.addEventListener('click',this.handleSquareClick.bind(this))
    
    this.board.forEach((square,index) => {
      let squareE = document.createElement('div');
      squareE.id = index;squareE.classList.add('square');
      gameBoard.appendChild(squareE);
    });
    
    document.body.appendChild(gameBoard);
  }
  
  start(){
    this.board = ["", "", "",
                  "", "", "",
                  "", "", ""];
    this.currPlayer = player_one_symbol;
    this.drawState();
  }
}

const game = new test().start();
