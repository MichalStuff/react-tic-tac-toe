import React from 'react'

const Result = (props) => {

    return (
        <div className="result">
            <h1>Turn: {props.turn ? "X" : "O"}</h1>
            <h1>Winner: {props.winner}</h1>
            <div>
                <h2>O wins: {props.score[0]} </h2>
                <h2>X wins: {props.score[1]} </h2>
                <h2>Remis: {props.score[2]} </h2>
            </div>

        </div>
    );
}

export default Result;