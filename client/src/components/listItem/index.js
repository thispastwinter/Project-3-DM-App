import React from 'react';
import Initiative from '../initiative/index';
import Health from '../health/index';

const ListItem = (props) => {

    const currentOrder = props.currentOrder;
    const checkForTop = id => {
        const index = currentOrder.findIndex(c => c.id === id)
        if (index === 0) {
            return <button onClick={() => props.turnDone(props.id)}> turn done </button>
        }
        else {
            return null;
        }
    }

    const checkForDeath = health => {
        if (health <= 0) {
            return <button onClick={() => props.removeChar(props.id)}> remove character </button>
        }
        else {
            return null;
        }
    }

    return (
        <li className='list-item'>Initiative: <Initiative {...props} /> {props.name} AC: {props.ac} Health: <Health {...props} />
            {checkForTop(props.id)}
            {checkForDeath(props.health)}
        </li >
    );
}

export default ListItem;
