import React from 'react';

const Node = (props) => {
    const {row, col, isAlive, toggleIsAlive} = props;

    let aditionalClassName = isAlive ? "alive" : "dead";

    return(
        <div className={`node ${aditionalClassName}`}
            onClick={() => toggleIsAlive(row,col)}
        ></div>
    )
}

export default Node;