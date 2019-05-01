import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Alert } from 'reactstrap';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginTop: '100px',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
class NewTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      date: '2017-01-01',
      debitAccount: '',
      creditAccount: '',
      amount: '',
      descreption: '',
      visible: false,
      infoColor: '',
      accList: [],
    }
    this.handleSuccess.bind(this);
    this.handleError.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount(){
    const token = localStorage.getItem('x-auth-token');

    axios.get(`https://financial-report.herokuapp.com/api/accounts`, {
      headers: {
        'x-auth-token': token
      }
    })
    .then(res=> {
      let accList = res.data;
      this.setState({
          accList: accList
      });
    })
    .catch(err => console.log(err));
  }

  handleSuccess = () => {
    this.setState({ 
      visible: true,
      infoColor: 'success',
      message: 'Transaction was added successful.... Redirecting to Dashboard in 3 seconds.'
    });
  };

  handleError = () => {
    this.setState({ 
      visible: true,
      infoColor: 'danger',
      message: 'Something went wrong.... Please try again.'
    });
  };
  
  onDismiss() {
    this.setState({ visible: false });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const transaction = {
      "debitAccount": this.state.debitAccount,
      "creditAccount": this.state.creditAccount,
      "amount": this.state.amount,
      "date": this.state.date,
      "descreption": this.state.descreption
    }
    axios.post(`https://financial-report.herokuapp.com/api/transactions`, transaction, {
      headers: {
        'x-auth-token': localStorage.getItem('x-auth-token')
      }
    })
    .then(res => {
      if(res.data) {
        this.handleSuccess();
        setTimeout(() => {
          document.location = "/dashboard"
        }, 3000);
      }  
      console.log(res.data)
    })
    .catch(err => {
      this.handleError();
    });
  }

  render() {
    if(!(localStorage.getItem('x-auth-token'))) {
      return <Redirect to="/" />
    } 
    const {classes} = this.props;
    return (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper} style={{borderRadius: '0px'}}>
            <Alert style={{borderRadius: '0px'}} color={this.state.infoColor} isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.message}
            </Alert>
            {(this.state.creditAccount === this.state.debitAccount) && ((this.state.creditAccount && this.state.debitAccount) !== '') ? 
              <Alert style={{borderRadius: '0px'}} color='danger' isOpen={true}>
                Credit Account and Debit Account cannot be same.
              </Alert> : ''
            }
            <Typography component="h1" variant="h5">
                Add New Transaction
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="debitAccount">Debit Account</InputLabel>
                <Select
                  value={this.state.debitAccount}
                  onChange={this.onChange}
                  input={<Input name="debitAccount" id="debitAccount" />}
                >
                  {this.state.accList.map((acc, i) => (
                      <MenuItem key={i} value={acc.accountName} style={{textTransform: 'capitalize'}}>{acc.accountName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="creditAccount">Credit Account</InputLabel>
                <Select
                  value={this.state.creditAccount}
                  onChange={this.onChange}
                  input={<Input name="creditAccount" id="creditAccount" />}
                >
                  {this.state.accList.map((acc, i) => (
                      <MenuItem key={i} value={acc.accountName} style={{textTransform: 'capitalize'}}>{acc.accountName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <Input 
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Amount"
                  onChange={this.onChange}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="descreption">Description</InputLabel>
                <Input 
                  type="text"
                  name="descreption"
                  id="descreption"
                  placeholder="Description"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="date">Date</InputLabel>
                <Input 
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Date"
                  inputProps={{ min: '2017-01-01' }}
                  value={this.state.date}
                  onChange={this.onChange}
                />
              </FormControl>
              {((this.state.creditAccount !== this.state.debitAccount) && (this.state.amount !== '') && (this.state.debitAccount !== '') && (this.state.creditAccount !== '')) ? 
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{borderRadius: '0px'}}
                >
                  Add Transaction
                </Button> : 
                <Button
                  type="submit"
                  fullWidth
                  disabled
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{borderRadius: '0px'}}
                >
                  Add Transaction
                </Button>
              }              
            </form>
          </Paper>
        </main>
    );
  }
}

NewTransaction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewTransaction);