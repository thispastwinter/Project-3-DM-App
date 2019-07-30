import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class Dexterity extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            dexterity: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.dexterity.toString()}
                key={this.props.dexterity}
                onSave={this.onSave}
                buttonsAlign='before'
            />
        )
    }
}