import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: '',
      username: "",
      password: "",
      toDashboard: false
    }
    this.handleSuccess.bind(this);
    this.handleError.bind(this);
  }

  handleSuccess = () => {
    this.setState({ 
        open: true,
        message: 'Registration Successful.... Please sign in.'
    });
  };

  handleError = () => {
    this.setState({ 
        open: true,
        message: 'Registration Unsuccessful.... Please try again.'
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
    const user = {
      "username": this.state.username,
      "password": this.state.password
    }
    axios.post(`https://financial-report.herokuapp.com/api/user`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if(res.data) {
          this.handleSuccess();
          setTimeout(() => {
            document.location = "/"
          }, 2500);
        }  
      })
      .catch(err => {
        this.handleError();
      });
  }

  render() {
    const {classes} = this.props;
    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Register
                </Typography>
                <form className={classes.form} onSubmit={this.routeChange}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input 
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        onChange={this.onChange} 
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        onChange={this.onChange}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register
                </Button>
                </form>
                <p className="mt-4">Already have an account? <Link to="/" style={{textDecoration: 'none'}}>Sign In</Link></p>
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

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);