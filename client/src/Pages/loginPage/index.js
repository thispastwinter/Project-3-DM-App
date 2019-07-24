import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Container } from 'react-bulma-components';
import './index.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginSuccess: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  handleChange = event => {
    console.log(event);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleLogin(event) {
    event.preventDefault();


    try {
      const response = await axios.post('api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password
      });
      if (response.data) {
        this.setState({
          loginSuccess: true,
        });
      } else {
        console.log('error on handleLogin');
      }
    } catch (err) {
      if (err) throw err;
      this.setState({
        loginSuccess: false,
      })
    }
  }

  render() {
    if (this.state.loginSuccess) {
      return <Redirect to='/' />
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
          <Button
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.handleLogin}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginPage;