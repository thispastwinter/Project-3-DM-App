import React, { Component } from 'react'
import EdiText from 'react-editext'
import "./index.css"

export default class Health extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            hit_points: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.health.toString()}
                key={this.props.health}
                onSave={this.onSave}
                buttonsAlign='before'
                editButtonContent={<img alt="shield" src="/images/heart.png" />}
                editButtonClassName="icon"
            />
        )
    }
}