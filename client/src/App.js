import React from 'react';
import './App.css';

const Card = (props) => (
  <div className="card" style={{ border: '1px solid gray' }}>
    <div>top</div>
    <div>{props.children}</div>
    <div>bottom</div>
  </div>
);

const LoginForm = () => (
  <div className="login-form">
    <form onSubmit={console.log('form submitted')}>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  </div>
);

function App() {
  return (
    <div className="AppWrapper" style={{ textAlign: 'Center'}}>
      <h1>Welcome</h1>
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}

export default App;
