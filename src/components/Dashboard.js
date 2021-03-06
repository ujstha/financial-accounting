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
import { Button } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  card: {
    minWidth: 200,
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
      accPerPage: 2,
      lastPage: ''
    }
    //this.handleClick = this.handleClick.bind(this);
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

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handlePrevious = event => {
    event.preventDefault();
    this.setState({
      currentPage: this.state.currentPage - 1
    })
  };

  handleFirst = event => {
    event.preventDefault();
    this.setState({
      currentPage: 1
    })
  };

  handleNext = event => {
    event.preventDefault();
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  };

  handleLast = event => {
    event.preventDefault();
    this.setState({
      currentPage: this.state.lastPage
    })
  };

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
    const previous = (
      <Button onClick={this.handlePrevious}>
        <i className="material-icons">keyboard_arrow_left</i>
      </Button>
    )
    const previousDisable = (
      <Button disabled>
        <i className="material-icons">keyboard_arrow_left</i>
      </Button>
    )
    const next = (
      <Button onClick={this.handleNext}>
        <i className="material-icons">keyboard_arrow_right</i>
      </Button>
    )
    const nextDisable = (
      <Button disabled>
        <i className="material-icons">keyboard_arrow_right</i>
      </Button>
    )
    const first = (
      <Button onClick={this.handleFirst}>
        <i className="material-icons">first_page</i>
      </Button>
    )
    const firstDisable = (
      <Button disabled>
        <i className="material-icons">first_page</i>
      </Button>
    )
    const last = (
      <Button onClick={this.handleLast}>
        <i className="material-icons">last_page</i>
      </Button>
    )
    const lastDisable = (
      <Button disabled>
        <i className="material-icons">last_page</i>
      </Button>
    )

    const renderAccounts = currentAccounts.map((acc, i) => (
      <div className="col-lg-8 offset-lg-2 col-md-12 mt-3" key={i}>
        <ExpansionPanel style={{borderRadius: '0px'}}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <Typography className={classes.heading} style={{textTransform: 'uppercase'}} noWrap>{acc.accountName}</Typography>
            <Typography className={classes.heading} style={{textTransform: 'uppercase'}}>
              <Link style={{color: 'red', float: 'right'}} to={`/deleteAccount/${acc.accountName}`}><DeleteIcon /></Link>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{borderTop: '1px solid grey'}}>
            <Typography style={{fontSize: '16px'}} component={'span'}>
              <p>
                <Link to={`/transaction/${acc.accountName}`} style={{textTransform: 'uppercase', textDecoration: 'none'}}>
                  Go to Transaction
                </Link>
              </p>
              <p className="text-capitalize"><b>Alias : </b>{acc.alias}</p>
              <p className="text-capitalize"><b>Closing Balance : </b>{acc.closingBalance}</p>
              <b>Closing Balance History</b>
              <div className="row">
                {acc.closingBalanceHistory.map((accHistory, i) => (
                  <div className="col-md-4 my-3" key={i}>
                    <Card className={classes.card} style={{borderRadius: '0px'}}>
                      <CardContent>
                        <Typography style={{fontSize: '16px'}} component={'span'}>
                          <p><b>Balance : </b>{accHistory.balance}</p>
                          <p><b>Date : </b>{moment(accHistory.date).format('MMM DD, YYYY')}</p>
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              <p className="text-capitalize"><b>Description : </b>{acc.descreption}</p>
              <p className="text-capitalize"><b>Inverntory Affects : </b>{acc.inventoryAffects.toString()}</p>
              <p><b>Opening Balance : </b>{acc.openingBalance}</p>
              <p className="text-capitalize"><b>Tag : </b>{acc.tag}</p>
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

    // eslint-disable-next-line array-callback-return
    const renderPageNumbers = pageNumbers.map(number => {
      let classes = this.state.currentPage === number ? 'active' : '';
      if ((number >= this.state.currentPage - 1 && number <= this.state.currentPage + 1)) {
        return (
          <li
            key={number}
            id={number}
            onClick={this.handleClick}
            className={classes}
          >
            {number}
          </li>
        );
      }
    });
    
    return (
      <div className={classes.root}>
        <h1 className="text-capitalize">{user.username}</h1>
        <div id="accountsList" className="container-fluid">
          <div className="row">
            {renderAccounts}
          </div>
        </div>
        {(renderPageNumbers.length <= 1) ? '' : 
          <div className="row">
            <ul className="col-md-12 text-center">
              {/*eslint-disable-next-line react/no-direct-mutation-state*/}
              Page {this.state.currentPage} of {this.state.lastPage = renderPageNumbers.length}
            </ul>
            <ul id="horizontal-list" className="col-md-12 text-center">
              {(currentPage > 2) ? first : firstDisable}
              {(currentPage > 1) ? previous : previousDisable}
              {renderPageNumbers}
              {((currentPage >= 1) && (currentPage < renderPageNumbers.length)) ? next : nextDisable}
              {(currentPage < renderPageNumbers.length) ? last : lastDisable}
            </ul>
          </div>
        }       
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
