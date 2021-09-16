import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Result from './components/Result';

const combinations = [
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
  ['0', '3', '6'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['0', '4', '8'],
  ['6', '4', '2']
];

class App extends Component {
  state = {
    fields: [
      {
        id: 1,
        status: 'empty'
      },
      {
        id: 2,
        status: 'empty'
      },
      {
        id: 3,
        status: 'empty'
      },
      {
        id: 4,
        status: 'empty'
      },
      {
        id: 5,
        status: 'empty'
      },
      {
        id: 6,
        status: 'empty'
      },
      {
        id: 7,
        status: 'empty'
      },
      {
        id: 8,
        status: 'empty'
      },
      {
        id: 9,
        status: 'empty'
      }
    ],
    turn: true,
    isGameWon: false,
    winner: "?",
    score: [0, 0, 0],
    bot: false
  }



  handleClick = (e) => {
    if (!this.state.isGameWon) {
      let temp = [...this.state.fields];
      if (temp[e.target.id - 1].status === 'empty') {
        if (this.state.turn) {
          temp[e.target.id - 1].status = 'x';
        } else {
          temp[e.target.id - 1].status = 'o';
        }
        this.setState((prevState) => ({
          fields: temp,
          turn: !prevState.turn
        }));
        this.state.bot && this.bot()
      } else {

      }
      
      this.checkEmptySpace();
      this.checkWinner();
    }
  }


  checkEmptySpace = () => {
    let board = [...this.state.fields];
    board = board.filter((item) => (
      item.status !== "empty"
    ));
    if (board.length === 9) {
      return true;
    } else {
      return false;
    }
  }

  checkWinner = () => {
    let board = [...this.state.fields];
    let value1, value2, value3;
    let score = this.state.score;
    board = board.map(field => (
      field.status
    ));
    for (let i = 0; i < 8; i++) {
      const [a, b, c] = combinations[i];
      value1 = board[a];
      value2 = board[b];
      value3 = board[c];
      if (value1 !== 'empty' && value1 === value2 && value1 === value3) {
        if (value1 === "x") {
          score[1] += 1;
        } else if (value1 === 'o') {
          score[0] += 1;
        }
        this.setState({
          isGameWon: true,
          winner: value1.toUpperCase(),
        });
        return
      }
    }
    if (!this.state.isGameWon && this.checkEmptySpace()) {
      score[2] += 1;
      this.setState({
        isGameWon: true,
        winner: 'REMIS!',
        score: score
      });
    }
  }

  handleReset = () => {
    this.setState({
      fields: [
        {
          id: 1,
          status: 'empty'
        },
        {
          id: 2,
          status: 'empty'
        },
        {
          id: 3,
          status: 'empty'
        },
        {
          id: 4,
          status: 'empty'
        },
        {
          id: 5,
          status: 'empty'
        },
        {
          id: 6,
          status: 'empty'
        },
        {
          id: 7,
          status: 'empty'
        },
        {
          id: 8,
          status: 'empty'
        },
        {
          id: 9,
          status: 'empty'
        }
      ],
      turn: true,
      isGameWon: false,
      winner: "?",
    })
  }
  handleResetScore = () => {
    this.setState({
      fields: [
        {
          id: 1,
          status: 'empty'
        },
        {
          id: 2,
          status: 'empty'
        },
        {
          id: 3,
          status: 'empty'
        },
        {
          id: 4,
          status: 'empty'
        },
        {
          id: 5,
          status: 'empty'
        },
        {
          id: 6,
          status: 'empty'
        },
        {
          id: 7,
          status: 'empty'
        },
        {
          id: 8,
          status: 'empty'
        },
        {
          id: 9,
          status: 'empty'
        }
      ],
      turn: true,
      isGameWon: false,
      winner: "?",
      socore: [0, 0, 0]
    })
  }

  handlePlayer = () => {
    this.setState((prevState) => ({
      bot: !prevState.bot
    }));
    this.handleReset();
  }

  bot = () =>{
    if(!this.state.isGameWon){
      let botOptions = [...this.state.fields];
      botOptions = botOptions.filter((index) => index.status === 'empty')
      if(botOptions.length > 0){
        let rand = Math.floor(Math.random() * botOptions.length);
        console.log(rand);
        botOptions[rand].status = 'o';
        this.setState((prevState) =>({
          turn : !prevState.turn 
        }));
      }
    }
  }

  render() {

    let fields = [...this.state.fields];
    fields = fields.map(field => (
      <Board key={field.id} id={field.id} status={field.status} click={this.handleClick} />
    ));
    return (
      <div className="app">
        <div className="table">
          <Result turn={this.state.turn} winner={this.state.winner} isGameWon={this.state.isGameWon} score={this.state.score} />
          <button className={this.state.bot ? 'bot_btn' : 'human_btn'} onClick={this.handlePlayer}>Play with {this.state.bot ? 'BOT' : 'HUMAN'}</button>
          <button className="reset_btn" onClick={this.handleReset}>RESET?</button>
        <button className="reset_btn" onClick={this.handleResetScore}>RESET SCORE?</button>
        </div>
        <div className="board">
          {fields}
        </div>


      </div>
    );
  }
}

export default App;
