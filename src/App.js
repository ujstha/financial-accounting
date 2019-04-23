import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/loginform';
import NavBar from './components/Nav';
import Dashboard from './components/Dashboard';
import Register from './components/register';
import Example from './components/error';
import NewAccount from './components/NewAccount';
import Transaction from './components/transaction';
import DeleteAccount from './components/deleteAccount';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div style={{ marginTop: '60px' }} className="container-fluid">
            <Switch>
              <Route path="/" component={Login} exact></Route>
              <Route path="/register" component={Register} exact></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
              <Route path="/newAccount" component={NewAccount}></Route>
              <Route path="/transaction/:accountName" component={Transaction}></Route>
              <Route path="/deleteAccount/:accountName" component={DeleteAccount}></Route>
              <Route  component={Example}></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
