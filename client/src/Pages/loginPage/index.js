import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
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
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleLogin(event) {
    event.preventDefault();

    // try {
    //   const response = await axios.post('api/v1/auth/login', {
    //     email: this.state.email,
    //     password: this.state.password
    //   });
    //   if (response.data) {
    //     this.setState({
    //       // ? Should I set state for email and password here? 
    //       // ? Does this work with the passport.js file/bcrypt.compare?
    //       loginSuccess: true,
    //     });
    //     // console.log('LOGIN SUCCESS LoginPage/index.js');
    //   } else {
    //     console.log('error on handleLogin');
    //   }
    // } catch (err) {
    //   if (err) throw err;
    //   this.setState({
    //     loginSuccess: false,
    //   })
    // }
  }

  render() {
    if (this.state.loginSuccess) {
      console.log('RENDER LOGIN SUCCESS = TRUE');
      return <Redirect to='/' />
    } else {
      console.log('RENDER LOGIN SUCCESS = FALSE');
    }

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default LoginPage;