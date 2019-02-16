import React, { Component } from "react";
import { Button } from 'react-bootstrap';

import config from '../config';
import './FacebookButton.css';

function waitForInit() {
  return new Promise((res, rej) => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

class FacebookButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    await waitForInit();
    this.setState({ isLoading: false });
  }

  statusChangeCallback = response => {
    if (response.status === "connected") {
      this.handleResponse(response.authResponse);
    } else {
      this.handleError(response);
    }
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  handleClick = () => {
    window.FB.login(this.checkLoginState, {scope: 'public_profile,email'});
  };

  handleError(error) {
    alert(error);
  }

  async handleResponse(data) {
    const { email, accessToken: token, expiresIn } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = { email };

    this.setState({ isLoading: true });

    try {
      if(data) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('expiresIn', expires_at);
        console.log('Logged in', data);
        this.props.handleGetProfile();
      }
      else {
        console.log('Cancelled authorization');
      }
      
      this.setState({ isLoading: false });
    } catch (e) {
      this.setState({ isLoading: false });
      this.handleError(e);
    }
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
          disabled={this.state.isLoading}
        >Login with Facebook</Button>
      </div>
    );
  }
}

export default FacebookButton;