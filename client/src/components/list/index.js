import React from 'react';

const List = (props) => {
    return (
        <ul className='list is-hoverable'>
            {props.children}
        </ul>
    );
}

export default List;