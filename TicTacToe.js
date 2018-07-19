'use strict';

class TicTacToe {
    
    constructor(X,O) {
        this.players = [X,O];
        this.scores = [0,0];
        this.boxes = ["","","","","","","","",""];
        this.turn = 0;
        this.lastBox = 0;
        this.lastBoxPreviousValue = 0;
        this.currentPlayerId = 0;
        this.winning = false;
        this.getOtherPlayer = () => { 
            if (this.currentPlayerId === 0) { this.currentPlayerId++ } 
            else { this.currentPlayerId-- }
        };
    }

    redrawContent() {
        const header = document.getElementsByTagName("header")[0];
        let scoreDisplay = document.getElementById("scoreboard").innerHTML;
        let instructionDisplay = document.getElementById("instruction").innerHTML;
        if (header.offsetWidth<600){
            header.innerHTML = "<h2 class='title'>Tic-Tac-Toe<div id='instruction'></div></h2><div></div><h2 id='scoreboard' class='scoreboardNarrow'></h2>"
        } else {
            header.innerHTML = "<h2 class='title'>Tic-Tac-Toe</h2><h2 id='instruction'></h2><h2 id='scoreboard'></h2>"
        }
        //getInstructions();
        //getScore();
        document.getElementById("scoreboard").innerHTML = scoreDisplay; 
        document.getElementById("instruction").innerHTML = instructionDisplay;
    }
    getScore() {
        const scoreboard = document.getElementById("scoreboard");
        const header = document.getElementsByTagName("header")[0];
        scoreboard.innerHTML = "";
        this.scores.map((score,i) => {
                scoreboard.innerHTML += "<div class='player'>" + this.players[i] + 
                    "'s: <span class='score'>" + this.scores[i] + "</span></div>";
        })
    }
    initGame() {
        this.turn = 0;
        this.winning = false;
        const gameboard = document.getElementById("gameboard");
        const instruction = document.getElementById("instruction");
        const footer = document.getElementById("footer");
        gameboard.innerHTML = "";
        instruction.innerHTML = "";
        footer.innerHTML = "";
        this.boxes = ["","","","","","","","",""];
        this.getScore();
        this.boxes.map((box, index) => gameboard.innerHTML += "<div id='"+index+"'></div>");
        instruction.innerHTML = this.players[this.currentPlayerId] + "'s turn";
    };
    selectBox(e) {
        let player = this.players[this.currentPlayerId];
        if (!this.winning && e.target.innerHTML === "") { 
            let box = e.target.id;
            this.lastBoxPreviousValue = this.boxes[box];
            this.boxes[box] = player;
            e.target.innerHTML = player;
            if (!this.checkForWinner()) {
                this.getOtherPlayer();
                this.lastBox = box;
                this.turn++
                this.getInstructions();
            }   
        }
    };
    getInstructions() {
        const instruction = document.getElementById("instruction");
        const footer = document.getElementById("footer");
        instruction.innerHTML = this.players[this.currentPlayerId] + "'s turn";
        footer.innerHTML = "<h2 class='buttonFooter' onclick='this.undo()'>UNDO</h2>";
        if (this.turn == 9) {
            this.turn = 0;
            instruction.innerHTML = "It's a draw!" ;
            footer.innerHTML = "<h2 class='buttonFooter' onclick='game.initGame()'>Re-Match!</h2>"
        }
    }
    addFooter() {
        const footer = document.getElementById("footer");
        footer.innerHTML = "<h2 class='buttonFooter' onclick='game.initGame()'>Re-Match!</h2>";
    }
    checkForWinner() {
        const wins = [
            { boxes: [0,4,8] },
            { boxes: [2,4,6] },
            { boxes: [0,1,2] },
            { boxes: [3,4,5] },
            { boxes: [6,7,8] },
            { boxes: [0,3,6] },
            { boxes: [1,4,7] },
            { boxes: [2,5,8] },
        ]
        let winner = this.winning;
        let player = this.players[this.currentPlayerId];
        if (this.turn > 3) {
            wins.map((win) => {
                win.boxes.map((box,index) => {
                    if (this.boxes[box] === player) { if (index === 0) { winner = true }} 
                    else { winner = false }
                })
                if (winner || this.winning) {
                    if (winner) {
                        this.scores[this.currentPlayerId]++
                        win.boxes.map((box,index) => {
                            if (this.boxes[box] === player) { 
                                document.getElementById(box).className += " highlight";
                                if (index === 0) { winner = true }
                            }
                        })
                    }
                    this.winning = true;
                    this.getScore();
                    document.getElementById("instruction").innerHTML = player + " WINS!!!!";
                    document.getElementById("footer").innerHTML = "<h2 class='buttonFooter' onclick='game.initGame()'>Re-Match!</h2>"
                }

            })
        }
        return this.winning
    };
    undo() {
        const instruction = document.getElementById("instruction");
        if (this.lastBoxPreviousValue != "0" && !winning) {
            this.boxes[this.lastBox] = this.lastBoxPreviousValue;
            document.getElementById(this.lastBox).innerHTML = this.lastBoxPreviousValue;
            this.lastBoxPreviousValue = "0";
            this.getOtherPlayer();
            instruction.innerHTML = this.players[this.currentPlayerId] + "'s turn";
            this.turn--
        }
    }
}

let game = new TicTacToe("X","O");