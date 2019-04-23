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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
class NewAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: '',
      accountName: "",
      alias: "",
      tag: "",
      descreption: "",
      inventoryAffects: "",
      openingBalance: "",
      listOfTags: [
        'bank account',
        'capital account',
        'cash in hand',
        'current liability',
        'current assets',
        'deposits (assets)',
        'direct expenses',
        'direct incomes',
        'duties and tax',
        'fixed assets',
        'indirect expenses',
        'indirect incomes',
        'investment',
        'loan (liability)',
        'loan (assets)',
        'provisions',
        'reserves and surplus',
        'sales account',
        'secured loan',
        'stock in hand',
        'sundry creditors',
        'sundry debtors'
      ]
    }
    this.handleSuccess.bind(this);
    this.handleError.bind(this);
  }

  handleSuccess = () => {
    this.setState({ 
        open: true,
        message: 'Account was added Successfully....'
    });
  };

  handleError = () => {
    this.setState({ 
        open: true,
        message: 'Something went wrong.... Please try again.'
    });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  routeChange = (event) => {
    event.preventDefault();
    const account = {
      "accountName": this.state.accountName,
      "alias": this.state.alias,
      "tag": this.state.tag,
      "inventoryAffects": this.state.inventoryAffects,
      "descreption": this.state.descreption,
      "openingBalance": this.state.openingBalance
    }
    axios.post(`https://financial-report.herokuapp.com/api/accounts`, account, {
        headers: {
          'x-auth-token': localStorage.getItem('x-auth-token')
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        if(res.data) {
          this.handleSuccess();
          setTimeout(() => {
            document.location = "/dashboard"
          }, 2500);
        }  
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
                <Typography component="h1" variant="h5">
                    Add New Account
                </Typography>
                <form className={classes.form} onSubmit={this.routeChange}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="accountName">Account Name</InputLabel>
                    <Input 
                        type="text"
                        name="accountName"
                        id="accountName"
                        placeholder="Account Name"
                        onChange={this.onChange}
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="alias">Alias Name</InputLabel>
                    <Input 
                        type="text"
                        name="alias"
                        id="alias"
                        placeholder="Alias Name"
                        onChange={this.onChange}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="tag">Tag</InputLabel>
                    <Select
                        value={this.state.tag}
                        onChange={this.onChange}
                        input={<Input name="tag" id="tag" />}
                    >
                        {this.state.listOfTags.map((list, i) => (
                            <MenuItem key={i} value={list}>{list}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="inventoryAffects">Inventory Affects</InputLabel>
                    <Select
                      value={this.state.inventoryAffects}
                      onChange={this.onChange}
                      input={<Input name="inventoryAffects" id="inventoryAffects" />}
                    >
                      <MenuItem value="false">False</MenuItem>
                      <MenuItem value="true">True</MenuItem>
                    </Select>
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
                    <InputLabel htmlFor="openingBalance">Opening Balance</InputLabel>
                    <Input 
                        type="text"
                        name="openingBalance"
                        id="openingBalance"
                        placeholder="Opening Balance"
                        onChange={this.onChange}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    style={{borderRadius: '0px'}}
                >
                    Add
                </Button>
                </form>
            </Paper>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={this.state.open}
                autoHideDuration={6000}
                onClose={this.handleClose}
                ContentProps={{
                'aria-describedby': 'message-id',
                }}
                message={<span id="message-id" className="text-light" style={{fontSize: '25px', fontFamily: 'Raleway'}}>{this.state.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <CloseIcon className="text-light" />
                    </IconButton>,
                ]}
            />
        </main>
    );
  }
}

NewAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewAccount);