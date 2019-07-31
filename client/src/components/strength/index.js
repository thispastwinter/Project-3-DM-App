import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class Strength extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            strength: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.strength.toString()}
                key={this.props.strength}
                onSave={this.onSave}
                buttonsAlign='before'
            />
        )
    }
}