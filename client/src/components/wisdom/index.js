import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class Wisdom extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            wisdom: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.wisdom.toString()}
                key={this.props.wisdom}
                onSave={this.onSave}
                buttonsAlign='before'
                editButtonContent={<img alt="spellbook" src="/images/wisdom.png" />}
                editButtonClassName="icon"
            />
        )
    }
}