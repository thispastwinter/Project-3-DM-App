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
      loginSuccess: false,
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
      // ????????????????????????????? if email and password match, this.setState loginSuccess: true
    } catch (err) {
      if (err) throw err;
    }
  }
}

export default LoginPage;