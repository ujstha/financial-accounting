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

const menuItems = [
  '/',
  '/register',
];

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      anchorEl: null,
      isOpen: false,
      users: '',
      active: '/'
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

  changeLink(menuItem) { 
    this.setState({ active: menuItem });
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
    const activeStyle = { color: 'white', backgroundColor: 'grey' };
    let user = this.state.users;
    const loginNav= (
      <div>
        {menuItems.map((menuItem, i) => 
          <Nav className="ml-auto" navbar key={i}>
            <NavItem className='text-uppercase'>
              <Link 
                style={this.state.active === menuItem ? activeStyle : {}} 
                onClick={this.changeLink.bind(this, menuItem)}
                to={menuItem}
              > 
                {menuItem === '/' ? menuItem = 'Login' : menuItem = 'Register'}
              </Link>
            </NavItem>
          </Nav>
         )}
      </div>
    )
   
    const userNav = (
      <Nav className="ml-auto" navbar>
        <NavItem className='text-uppercase'>
          <IconButton 
            className="text-light mr-2" 
            onClick={this.newAccount} 
            style={window.location.pathname === '/newAccount' ? activeStyle : {}}>
            <AddIcon />
          </IconButton>
        </NavItem>
        <NavItem className='text-uppercase'>
          <IconButton
            onClick={this.handleClick}
            className="text-light"
            style={window.location.pathname === '/dashboard' ? activeStyle : {}}
          >
            <AccountCircle />
          </IconButton>
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
        </NavItem>
      </Nav>
    )
    return (
      <div>
        <Navbar color="dark" dark expand="md" className='fixed-top'>
          <NavbarBrand href="/" style={{fontFamily: 'Srisakdi', fontStyle: 'cursive'}}>Financial</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {localStorage.getItem('x-auth-token') ? userNav : loginNav}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}