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
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      anchorEl: null,
      isOpen: false,
      users: ''
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

  render() {
    const { anchorEl } = this.state;
    let user = this.state.users;
    const loginNav= (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    )

    const userNav = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <IconButton className="text-light mr-2" onClick={this.newAccount}>
           <AddIcon />
          </IconButton>
        </li>
        <li className="nav-item">
          <IconButton
            onClick={this.handleClick}
            className="text-light"
          >
            <AccountCircle />
          </IconButton>
        </li>
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
      </ul>
    )
    return (
      <div>
        <Navbar color="dark" dark expand="md" className='fixed-top'>
          <NavbarBrand href="/">Financial</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className='text-uppercase'>
                {localStorage.getItem('x-auth-token') ? userNav : loginNav}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}