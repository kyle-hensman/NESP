import React from 'react';
import axios from 'axios';
import './App.css';

const SideBar = props => (
  <React.Fragment>
    <div className="col-lg-2 bg-success">
      <div className="sidebar">
        yesir
      </div>
    </div>
  </React.Fragment>
);

const MainScreen = props => (
  <React.Fragment>
    <div className="col-lg-7 bg-secondary">
      <div className="main-screen">
        mainz
      </div>
    </div>
  </React.Fragment>
);

const Options = props => (
  <React.Fragment>
    <div className="col bg-info">
      <div className="options">
        yesir
      </div>
    </div>
  </React.Fragment>
);

class AccountPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "You are now logged in"
    }
  }

  render() {
    return (
      <div className="account-panel container-fluid">
        <div className="row">
          <SideBar />
          <MainScreen />
          <Options />
        </div>
      </div>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: '',
      password: '',
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = async e => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

      const data = {
        email: this.state.email,
        password: this.state.password,
      }

      const response = await axios({
        method: 'post',
        url: '/login',
        config: config,
        data: data,
      });

      if (response) {
        console.log(response);
      }

      if (response.data) {
        console.log(response.data);
        this.setState({
          user: true,
        })
      }

    // if (this.state.email !== '' && this.state.password !== '') {
    //   const headers = { 'Content-Type': 'application/json' };

    //   const data = {
    //     email: this.state.email,
    //     password: this.state.password,
    //   }

    //   const response = await axios({
    //     method: 'post',
    //     url: '/login',
    //     headers: headers,
    //     data: data,
    //   });

    //   if (response) {
    //     console.log(response.data);
    //     this.setState({
    //       user: true,
    //     })
    //   }
    // }

    // console.log(response);
  }

  render() {

    if (this.state.user) {
      return (
        <div className="bg-danger">
          <AccountPanel />
        </div>
      );
    }

    return (
      <div className="card">
        <h2>Login to NESP</h2>
        <div className="card-body my-1">
          <form onSubmit={this.handleFormSubmit}>
            <input
              name="email"
              type="text"
              placeholder="Username"
              className="form-control"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="AppWrapper" style={{ textAlign: 'Center'}}>
      <LoginForm />
    </div>
  );
}

export default App;
