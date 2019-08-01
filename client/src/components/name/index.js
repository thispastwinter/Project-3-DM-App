import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class Name extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editChar({
            ...this.props.character,
            name: val
        });
    }

    render() {
        return (
            <EdiText
                type='text'
                value={this.props.name.toString()}
                key={this.props.name}
                onSave={this.onSave}
                buttonsAlign='after'
                editButtonContent={<img alt="lifting weights" src="/images/name.png" />}
                editButtonClassName="icon"
                inputProps={{
                    style: {
                        maxWidth: 300
                    }
                }}
            />
        )
    }
}