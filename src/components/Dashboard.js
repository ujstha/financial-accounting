import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import moment from 'moment';
import Pagination from 'react-js-pagination';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  card: {
    minWidth: 275,
    backgroundColor: 'lightgrey',
    color: 'light'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: '',
      accounts: [],
      accList: [],
      currentPage: 1,
      accPerPage: 3
    }
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount(){
    const token = localStorage.getItem('x-auth-token');
    axios.get(`https://financial-report.herokuapp.com/api/user`, {
      headers: {
        'x-auth-token': token
      }
    })
    .then(res=> {
      console.log('hell',res.data);
      let users = res.data;
      this.setState({
          users: users,
          accounts: users.accounts
      });
    })
    .catch(err => console.log(err));

    axios.get(`https://financial-report.herokuapp.com/api/accounts`, {
      headers: {
        'x-auth-token': token
      }
    })
    .then(res=> {
      console.log('hell yeah',res.data);
      let accList = res.data;
      this.setState({
          accList: accList
      });
    })
    .catch(err => console.log(err));
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    if(!(localStorage.getItem('x-auth-token'))) {
      return <Redirect to="/" />
    }
    const { classes } = this.props;
    let user = this.state.users;
    const { accList, currentPage, accPerPage } = this.state;
    const indexOfLastAccount = currentPage * accPerPage;
    const indexOfFirstAccount = indexOfLastAccount - accPerPage;
    const currentAccounts = accList.slice(indexOfFirstAccount, indexOfLastAccount);

    const renderAccounts = currentAccounts.map((acc, i) => (
      <div className="col-md-8 offset-md-2 mt-3" key={i}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading} style={{textTransform: 'uppercase'}}>{acc.accountName}</Typography>
            <Typography className={classes.heading} style={{textTransform: 'uppercase'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link style={{color: 'red', float: 'right'}} to={`/deleteAccount/${acc.accountName}`}>Delete</Link></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{borderTop: '1px solid grey'}}>
            <Typography style={{fontSize: '16px'}}>
              <p>
                <Link to={`/transaction/${acc.accountName}`} style={{textTransform: 'uppercase', textDecoration: 'none'}}>
                  {acc.accountName}
                </Link>
              </p>
              <p><b>Alias : </b>{acc.alias}</p>
              <p><b>Closing Balance : </b>{acc.closingBalance}</p>
              <b>Closing Balance History</b>
              <div className="row">
                {acc.closingBalanceHistory.map((accHistory, i) => (
                  <div className="col-md-4 my-3" key={i}>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography style={{fontSize: '16px'}}>
                          <p><b>Balance : </b>{accHistory.balance}</p>
                          <p><b>Date : </b>{moment(accHistory.date).format('MMM DD, YYYY')}</p>
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              <p><b>Description : </b>{acc.descreption}</p>
              <p><b>Inverntory Affects : </b>{acc.inventoryAffects.toString()}</p>
              <p><b>Opening Balance : </b>{acc.openingBalance}</p>
              <p><b>Tag : </b>{acc.tag}</p>
            </Typography>
          </ExpansionPanelDetails>              
        </ExpansionPanel>
      </div>
    ))
    /*
    let account = this.state.accounts.map((acc, i) => (
      <div className="col-md-4 mt-3" key={i}>
        <p>{acc}</p>
      </div>
    ));
    */
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(accList.length / accPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });
    
    return (
      <div className={classes.root}>
        <h1>{user.username}</h1>
        <div id="accountsList" className="container-fluid">
          <div className="row">
            {renderAccounts}
          </div>
        </div>     
        <div id="menu-outer">
          <ul id="horizontal-list">
            {renderPageNumbers}
          </ul>
        </div>  
        <div className="row">
          {this.state.currentPage}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
