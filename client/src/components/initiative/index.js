import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class Initiative extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            initiative: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type="number"
                value={this.props.init.toString()}
                key={this.props.init}
                onSave={this.onSave}
                buttonsAlign='before'
                editButtonContent={<img alt="shield" src="/images/init.png" />}
                editButtonClassName="icon"
            />
        )
    }
}