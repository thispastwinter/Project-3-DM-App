import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class ArmorClass extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            armor_class: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.armorClass.toString()}
                key={this.props.armorClass}
                onSave={this.onSave}
                buttonsAlign='before'
            />
        )
    }
}