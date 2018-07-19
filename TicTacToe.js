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
        this.footer = document.getElementById("footer");
        this.header = document.getElementsByTagName("header")[0];
        this.scoreboard = document.getElementById("scoreboard");
        this.instruction = document.getElementById("instruction");
        this.gameboard = document.getElementById("gameboard");
        this.footer.addEventListener('click', () => this.footerClick());
    }
    getOtherPlayer() { 
        if (this.currentPlayerId === 0) { this.currentPlayerId++ } 
        else { this.currentPlayerId-- }
    }
    redrawContent() {
        let scoreDisplay = this.scoreboard.innerHTML;
        let instructionDisplay = this.instruction.innerHTML;
        if (this.header.offsetWidth<600){
            this.header.innerHTML = "<div class='title'>"+screen.orientation.angle+"<div id='instruction'></div></div><div></div><div id='scoreboard' class='scoreboardNarrow'></div>"
        } else {
            this.header.innerHTML = "<div class='title'>"+screen.orientation.angle+"</div><div id='instruction'></div><div id='scoreboard'></div>"
        }
        this.scoreboard = document.getElementById("scoreboard");
        this.instruction = document.getElementById("instruction");
        this.scoreboard.innerHTML = scoreDisplay; 
        this.instruction.innerHTML = instructionDisplay;
    }
    getScore() {
        this.scoreboard.innerHTML = "";
        this.scores.map((score,i) => {
                this.scoreboard.innerHTML += "<div class='player'>" + this.players[i] + 
                    "'s: <span class='score'>" + this.scores[i] + "</span></div>";
        })
    }
    initGame() {
        this.turn = 0;
        this.winning = false;
        this.gameboard.innerHTML = "";
        this.instruction.innerHTML = "";
        this.footer.innerHTML = "";
        this.boxes = ["","","","","","","","",""];
        this.getScore();
        this.boxes.map((box, index) => this.gameboard.innerHTML += "<div id='"+index+"'></div>");
        this.instruction.innerHTML = this.players[this.currentPlayerId] + "'s turn";
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
        this.instruction.innerHTML = this.players[this.currentPlayerId] + "'s turn";
        this.footer.innerHTML = "UNDO";
        if (this.turn == 9) {
            this.turn = 0;
            this.instruction.innerHTML = "It's a draw!" ;
            this.footer.innerHTML = "Re-Match!"
        }
    }
    addFooter() {
        this.footer.innerHTML = "Re-Match!";
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
                    this.instruction.innerHTML = player + " WINS!!!!";
                    this.footer.innerHTML = "Re-Match!";
                }

            })
        }
        return this.winning
    };
    footerClick() {
        if (this.footer.innerHTML.indexOf("UNDO")>-1) {
            this.undo();
        } else {
            this.initGame();
        }
        
    }
    undo() {
        if (this.lastBoxPreviousValue != "0" && !this.winning) {
            this.boxes[this.lastBox] = this.lastBoxPreviousValue;
            document.getElementById(this.lastBox).innerHTML = this.lastBoxPreviousValue;
            this.lastBoxPreviousValue = "0";
            this.getOtherPlayer();
            this.instruction.innerHTML = this.players[this.currentPlayerId] + "'s turn";
            this.turn--
        }
    }
}

let game = new TicTacToe("X","O");