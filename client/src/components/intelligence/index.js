import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class Intelligence extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            intelligence: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.intelligence.toString()}
                key={this.props.intelligence}
                onSave={this.onSave}
                buttonsAlign='before'
            />
        )
    }
}