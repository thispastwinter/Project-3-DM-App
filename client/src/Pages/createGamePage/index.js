import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container } from 'react-bulma-components';
import './index.css';
import MyButton from '../../components/buttons';

class CreateGamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            game_id: null,
            createSuccess: false,
            secret: ''
        };
        this.handleCreate = this.handleCreate.bind(this);
    }
    validateForm() {
        return this.state.name.length > 0;
    };
    handleChange = event => {
        const value = event.target.value;
        this.setState({
            [event.target.id]: value
        });
    }
    async handleCreate(event) {
        event.preventDefault();
        let secret = Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '').substr(0, 8);

        try {
            const response = await axios.post('api/v1/games', {
                name: this.state.name,
                secret: secret,
                user_id: this.props.location.state.user_id
            });
            if (response.data) {
                console.log(response.data);
                this.setState({
                    game_id: response.data.id,
                    secret,
                    createSuccess: true,
                });
            } else {
                console.log(response);
            }
        } catch (err) {
            if (err) throw err;
            this.setState({
                createSuccess: false,
            })
        }
    }

    render() {
        if (this.state.createSuccess) {
            return <Redirect to={{
                pathname: '/initadmin',
                state: {
                    game_id: this.state.game_id,
                    secret: this.state.secret,
                    game_name: this.state.name,
                    admin: this.props.location.state.admin,
                    user_id: this.props.location.state.user_id
                }
            }}
            />
        }

        return (
            <div className="createGame">
                <h1 className="title">Create New Game</h1>
                <form onSubmit={this.handleSubmit}>
                    <Container>
                        <Form.Label>Game Name</Form.Label>
                        <Form.Input
                            value={this.state.name}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="name"
                        />
                    </Container>
                    <MyButton
                        text="Create Game"
                        primary={true}
                        disabled={!this.validateForm()}
                        onClick={this.handleCreate}
                    >
          </MyButton>
                </form>
            </div>
        );
    }
}

export default CreateGamePage;