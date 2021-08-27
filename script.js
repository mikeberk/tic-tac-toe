const squares = document.querySelectorAll('.square');
const displayButton = document.querySelector('.display');
const playerButtons = document.querySelectorAll('.player');
const gameMessage = document.getElementById('game-message');
const resetBtn = document.getElementById('reset-btn');

const Player = (token) => {
    this.token = token;
    const getToken = () => {
        return token;
    }
    return {
        getToken
    }
};

const gameBoard = (() => {
    // establish game board matrix
    let currentBoard = ['','','','','','','','',''];
    const getMark = (index) => {
        return currentBoard[index];
    }
    const setMark = (token, index) => {
        currentBoard.splice(index, 1, token);
    }

    const resetBoard = () => {
        for (let i = 0; i < currentBoard.length; i++) {
            currentBoard[i] = '';
        }
    }
    return {
        currentBoard,
        getMark,
        setMark,
        resetBoard
    }
})();

const gameController = (() => {
    // turn variable for determining current player turn
    let turn = 1;
    const playerOne = Player('x');
    const playerTwo = Player('o');

    /*const createPlayer = (e) => {
        // create an instance of a player by passing the event class as the marker
        if (e.target.id == "human") {
            const playerOne = Player('x');
            const playerTwo = Player('o');
            return playerOne, playerTwo;
            console.log(e.target.id);
        } else if (e.target.id == "cpu") {
            const playerOne = Player('o');
            const playerTwo = Player('x');
        } else {
            console.log('invalid option');
        }
    } */

    const getCurrentToken = () => {
        return turn % 2 === 1 ? playerOne.getToken() : playerTwo.getToken();
    }
    
    let winConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    const checkWin = (token) => {
       return winConditions
        .some((row) => row
        .every((boardIndex) => gameBoard.currentBoard[boardIndex] == token));
    }

    const playTurn = (e) => {
        if (gameBoard.getMark(e.target.dataset.grid) === '') {
            gameBoard.setMark(getCurrentToken(), e.target.dataset.grid);
            displayController.displayBoard();
            if (checkWin(getCurrentToken())) {
                displayController.toggleResetBtn();
                displayController.displayMessage(`Player ${getCurrentToken().toUpperCase()} wins!`);
                squares.forEach(square => square.removeEventListener('click', gameController.playTurn));

            } else if (gameBoard.currentBoard.every((boardIndex) => boardIndex != '')){
                displayController.toggleResetBtn();
                displayController.displayMessage(`It's a draw`);
                squares.forEach(square => square.removeEventListener('click', gameController.playTurn));
            } else {
                turn ++;
            }  
        }
    }

    const newGame = () => {
        let p = document.querySelector('#game-message > p');
        gameMessage.removeChild(p);
        gameBoard.resetBoard();
        displayController.displayBoard();
        displayController.toggleResetBtn();
        turn = 1;
        squares.forEach(square => square.addEventListener('click', gameController.playTurn));
    }


    return {
        playTurn,
        newGame
    }
})();

const displayController = (() => {

    const displayBoard = () => {
        squares.forEach((square, i) => {
            square.textContent = gameBoard.currentBoard[i];
        });
    }

    const displayMessage = (message) => {
        let messageP = document.createElement('p');
        messageP.textContent = message;
        gameMessage.appendChild(messageP);
    }

    const toggleResetBtn = () => {
        resetBtn.classList.toggle('visible');
    }

    /*const updateTurn = () => {
        turn % 2 == 0 ? 
    }*/

    return {
        displayBoard,
        displayMessage,
        toggleResetBtn
    }
})();

//displayButton.addEventListener('click', displayController.displayBoard);
squares.forEach(square => square.addEventListener('click', gameController.playTurn));
//playerButtons.forEach(btn => btn.addEventListener('click', gameController.createPlayer));
resetBtn.addEventListener('click', gameController.newGame);


/* 
two options: player vs. player or player vs. cpu
(1) if user selects player vs. player...
(2) instantiate two player objects; player 1 = token(x) and player 2 = token(o)
(3) set player 1 to turn = true. All odd turns will be player 1
(4) set player 2 to turn = false. All even turns will be player 2


*/