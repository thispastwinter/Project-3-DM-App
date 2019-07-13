import React from 'react';

const ListItem = (props) => {
    return (
        <li>Initiative: {props.init} {props.name} AC:{props.ac} Health: {props.health}
            <button onClick={() => props.turnDone(props.id)}>
                turn done
      </button>
            <button onClick={() => props.delayTurn(props.id)}>
                delay turn
      </button></li>
    );
}

export default ListItem;