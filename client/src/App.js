import React from 'react';
import './App.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('form sumbitted!');
    console.log('state', this.state);
  }

  render() {
    return (
      <div className="card">
        <div className="card-body my-1">
          <form onSubmit={this.handleFormSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="form-control"
              value={this.state.username}
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
      <h1>Welcome to NESP Account Manager</h1>
      <div style={{ marginTop: '25vh' }}></div>
      <LoginForm />
    </div>
  );
}

export default App;
