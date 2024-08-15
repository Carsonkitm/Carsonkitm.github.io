import { useState } from "react";

function Square({ value, onSquareClick }) {
  function handleClick() {
    setValue("X");
  }
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(42).fill(null));
  const [count, setCount] = useState(0);


  function handleClick(i) {
    if (calculateWinner(squares) || count == 42) {
      return;
    }
    while (i <= 42) {
      if(count == 42){
        status = "its a tie";
        return;
      }
      if (squares[i]) {
        console.log("squares[i] is not empty", i);
        i += 7;
        continue;
      } else {
        console.log("writing to ", i);
        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[i] = "X";
        } else {
          nextSquares[i] = "O";
        }
        setCount(count + 1);
        console.log("count ", count);
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
        return;
      }
    }
  }
  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner "+ winner;
  } else if(count == 42){
    status = "It is a tie.";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[35]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[36]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[37]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[38]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[39]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[40]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[41]} onSquareClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Square value={squares[28]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[29]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[30]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[31]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[32]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[33]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[34]} onSquareClick={() => handleClick(6)} />
      </div>

      <div className="board-row">
        <Square value={squares[21]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[22]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[23]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[24]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[25]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[26]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[27]} onSquareClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Square value={squares[14]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[15]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[16]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[17]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[18]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[19]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[20]} onSquareClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Square value={squares[7]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[10]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[11]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[12]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[13]} onSquareClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  for (let i = 0; i <= 42; i++) {
    if (squares[i] && squares[i] == squares[i + 7] && squares[i] == squares[i + 14] && squares[i] == squares[i + 21]) {
      console.log(squares[i], squares[i + 7], squares[i + 14], squares[i + 21])
      return squares[i];
    }else if(squares[i] && squares[i] == squares[i + 1] && squares[i] == squares[i + 2] && squares[i] == squares[i + 3]){
      console.log(squares[i], squares[i + 1], squares[i + 2], squares[i + 3])
      return squares[i]
    }else if(squares[i] && squares[i] == squares[i + 8] && squares[i] == squares[i + 16] && squares[i] == squares[i + 24]){
      console.log(squares[i], squares[i + 8], squares[i + 16], squares[i + 24])
      return squares[i];
    }else if(squares[i] && squares[i] == squares[i + 6] && squares[i] == squares[i + 12] && squares[i] == squares[i + 18]){
      console.log(squares[i] && squares[i], squares[i + 6], squares[i + 12], squares[i + 18])
      return squares[i]
    }
  }
  return null;
}


