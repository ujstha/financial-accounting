import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      anchorEl: null,
      isOpen: false,
      users: '',
      left: false,
    };
  }

  componentDidMount() {
    axios.get(`https://financial-report.herokuapp.com/api/user`, {
      headers: {
        'x-auth-token': localStorage.getItem('x-auth-token')
      }
    })
    .then(res=> {
      console.log('hell',res.data);
      let users = res.data;
      this.setState({
          users: users
      });
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  logOut() {
    localStorage.removeItem('x-auth-token');
    if(!(localStorage.getItem('x-auth-token'))) {
      document.location="/";
    }
  }
  
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  newAccount() {
    document.location = "/newAccount";
  }

  register() {
    document.location = "/register";
  }

  login() {
    document.location = "/";
  }

  render() {
    const { anchorEl } = this.state;
    let user = this.state.users;
    const loginNav= (
      <div>
        <List>
          <ListItem button onClick={this.login}>
            <ListItemText>Login</ListItemText>
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={this.register}>
            <ListItemText>Register</ListItemText>
          </ListItem>
        </List>
      </div>
    )

    const userNav = (
      <div>
        <List>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <ListItemText>{user.username}</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={this.newAccount}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText>New Account</ListItemText>
          </ListItem>
        </List>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>Welcome &nbsp;<b>{user.username}!</b></MenuItem>
          <Divider />
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={this.logOut.bind(this)}>Logout</MenuItem>
        </Menu>
      </div>
    )

    return (
      <div>
        <Navbar color="dark" dark className='fixed-top text-uppercase' style={{fontFamily: 'Raleway'}}>
          <NavbarBrand href="/">Financial</NavbarBrand>
          <NavbarToggler onClick={this.toggleDrawer('left', true)} />
        </Navbar>
        
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
          >
            {localStorage.getItem('x-auth-token') ? userNav : loginNav}
          </div>
        </Drawer>
      </div>
    );
  }
}
