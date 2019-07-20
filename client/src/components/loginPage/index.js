import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);


  }

  async handleLogin(event) {
    event.preventDefault();

    try {
      const response = await axios.post('api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password
      });
      console.log('RESPONSE.DATA', response.data);
      console.log('RESPONSE.DATA.PASSWORD', response.data.password);
    } catch (err) {
      if (err) throw err;
    }
  }
}

export default LoginPage;