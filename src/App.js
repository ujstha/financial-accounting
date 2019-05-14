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
import DeleteAccount from './components/DeleteAccount';
import NewTransaction from './components/NewTransaction';
import PersonalDetails from './components/PersonalDetails';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import { deepPurple } from '@material-ui/core/colors';
import Back from './components/back';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    background: {
      "paper": '#fafafa'
    },
    color: {
      "paper": 'white'
    }
  },
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Raleway',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <div style={{ marginTop: '60px', marginBottom: '60px' }} className="container-fluid">
              <Switch>
                <Route path="/" component={Login} exact></Route>
                <Route path="/register" component={Register} exact></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
                <Route path="/newAccount" component={NewAccount}></Route>
                <Route path="/newTransaction" component={NewTransaction}></Route>
                <Route path="/personalDetails" component={PersonalDetails}></Route>
                <Route path="/transaction/:accountName" component={Transaction}></Route>
                <Route path="/deleteAccount/:accountName" component={DeleteAccount}></Route>
                <Route  component={Example}></Route>
              </Switch>
              <Back />
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
