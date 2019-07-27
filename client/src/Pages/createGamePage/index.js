import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container } from 'react-bulma-components';
import './index.css';

class CreateUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            gameId: null,
            createSuccess: false,
            secret: null,
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
        let secret = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
        this.setState({ secret });


        try {
            const response = await axios.post('api/v1/games', {
                name: this.state.name,
                secret: this.state.secret
            });
            if (response.data) {
                console.log(response.data);
                this.setState({
                    gameId: response.data.id,
                    createSuccess: true,
                });
            } else {
                console.log('error on createGame');
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
                state: { gameId: this.state.gameId }
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
                    <Button
                        disabled={!this.validateForm()}
                        type="submit"
                        color="success"
                        onClick={this.handleCreate}
                    >
                        Create Game
          </Button>
                </form>
            </div>
        );
    }
}

export default CreateUserPage;