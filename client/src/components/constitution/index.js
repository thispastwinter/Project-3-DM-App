import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class Constitution extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            constitution: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.constitution.toString()}
                key={this.props.constitution}
                onSave={this.onSave}
                buttonsAlign='before'
                editButtonContent={<img alt="body" src="/images/constitution.png" />}
                editButtonClassName="icon"
            />
        )
    }
}