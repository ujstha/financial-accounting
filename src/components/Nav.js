import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand
} from 'reactstrap';
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
    if(localStorage.getItem('x-auth-token')) {
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
  dashboard() {
    document.location = "/dashboard";
  }
  
  render() {
    const { anchorEl } = this.state;
    const activeStyle = { color: 'white', backgroundColor: '#7B1FA2' };
    let user = this.state.users;
    const loginNav= (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a 
            href="/"
            className=""
            style={window.location.pathname === '/' ? activeStyle : {}}
          >
            Login
          </a>
        </li>
        <li className="nav-item">
          <a 
            href="/register"
            style={window.location.pathname === '/register' ? activeStyle : {}}
          >
            Register
          </a>
        </li>
      </ul>
    )

    const userNav = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <IconButton 
            className="text-light mr-2" 
            onClick={this.newAccount} 
            style={window.location.pathname === '/newAccount' ? activeStyle : {}}>
            <AddIcon />
          </IconButton>
        </li>
        <li className="nav-item">
          <IconButton
            onClick={this.handleClick}
            className="text-light"
            style={window.location.pathname === '/dashboard' ? activeStyle : {}}
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
          <MenuItem onClick={this.dashboard.bind(this)}>Dashboard</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={this.logOut.bind(this)}>Logout</MenuItem>
        </Menu>
      </ul>
    )
    return (
      <div>
        <Navbar style={{backgroundColor: '#6A1B9A'}} dark expand="md" className='fixed-top'>
          <NavbarBrand href="/" style={{fontFamily: 'Srisakdi', fontStyle: 'cursive', color: 'white'}}>Financial</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {localStorage.getItem('x-auth-token') ? userNav : loginNav}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}