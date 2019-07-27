/* eslint-disable no-console */
import React, { Component } from 'react';
import { Button, Form, Container } from 'react-bulma-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./index.css"

class ForgotPasswordPage extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      try {
        const response = await axios.post(
          '/forgotPassword',
          {
            email,
          },
        );
        console.log(response.data);
        if (response.data === 'recovery email sent') {
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
          });
        }
      }
    }
  };

  render() {
    const {
      email, messageFromServer, showNullError, showError
    } = this.state;

    return (
      <div className="passwordReset">
        <h1 className="title">Forgot your password?</h1>
        <form onSubmit={this.sendEmail}>
          <Container>
            <Form.Label>Email</Form.Label>
            <Form.Input
              value={email}
              type="email"
              onChange={this.handleChange('email')}
              className="input"
              id="email"
              placeholder="Email Address"
            />
          </Container>
          <Button
            type="submit"
            color="success"
            onClick={this.sendEmail}
          >
            Send Password Reset Email
          </Button>
        </form>
        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </p>
            <Link exact to="/createuser">
              <Button renderAs="button" color="warning"><span>Create New User</span></Button>
            </Link>
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
      </div>
    );
  }
}

export default ForgotPasswordPage;