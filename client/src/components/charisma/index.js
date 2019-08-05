import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class Charisma extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            charisma: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.charisma.toString()}
                key={this.props.charisma}
                onSave={this.onSave}
                buttonsAlign='before'
                editButtonContent={<img alt="speaker" src="/images/charisma.png" />}
                editButtonClassName="icon"
            />
        )
    }
}