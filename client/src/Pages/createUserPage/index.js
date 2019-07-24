import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container } from 'react-bulma-components';
import './index.css';

class CreateUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            admin: false,
            createSuccess: false
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    };

    handleChange = event => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [event.target.id]: value
        });
    }

    async handleLogin(event) {
        event.preventDefault();


        try {
            const newUser = await axios.get('api/v1/users/' + this.state.email);
            if (newUser.data) {
                alert("A user with this e-mail already exists");
            }
            else {
                const response = await axios.post('api/v1/users', {
                    email: this.state.email,
                    password: this.state.password,
                    admin: this.state.admin
                });
                if (response.data) {
                    this.setState({
                        createSuccess: true,
                    });
                } else {
                    console.log('error on createUser');
                }
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
            return <Redirect to='/init' />
        }

        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <Container>
                        <Form.Label>Email</Form.Label>
                        <Form.Input
                            value={this.state.email}
                            type="email"
                            onChange={this.handleChange}
                            className="input"
                            id="email"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Password</Form.Label>
                        <Form.Input
                            value={this.state.password}
                            type="password"
                            onChange={this.handleChange}
                            className="input"
                            id="password"
                        />
                    </Container>
                    <Container>
                        <Form.Checkbox onChange={this.handleChange} id="admin" checked={this.state.admin}>
                            Will this be a Dungeon Master account for a game?
                </Form.Checkbox>
                    </Container>
                    <Button
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.handleLogin}
                    >
                        Create Character
          </Button>
                </form>
            </div>
        );
    }
}

export default CreateUserPage;