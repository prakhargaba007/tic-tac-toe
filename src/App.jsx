import React, { useState } from "react";
import "./App.css";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./WinningCombination"
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (let combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];


    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2"
  });

  let [gameTurns, setGameTurns] = useState([])
  let activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = [...initialGameBoard.map(array => [...array])]

  for (let turn of gameTurns) {
    let { square, player } = turn
    let { row, col } = square
    gameBoard[row][col] = player
  }

  const winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns

    });
  }
  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newPlayer) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newPlayer
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={"player 1"}
            symbol={'X'}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={"player 2"}
            symbol={'O'}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
