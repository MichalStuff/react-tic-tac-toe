import React from 'react';

const Board = (props) => {
    return (
        <div className={props.status} onClick={props.click} id={props.id}>
        </div>
    );
}

export default Board;