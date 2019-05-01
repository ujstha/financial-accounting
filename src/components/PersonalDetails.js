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
class PersonalDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      visible: false,
      infoColor: '',
      name: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      sex: '',
      listOfSex: [
        'male',
        'female',
        'other'
      ],
      countryCode: '',
      phoneNumber: '',
      email: '',
      citizenship: '',
      socialSecurityNumber: '',
      dateOfBirth: '1990-01-01'
    }
    this.handleSuccess.bind(this);
    this.handleError.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  handleSuccess = () => {
    this.setState({ 
      visible: true,
      infoColor: 'success',
      message: 'Personal Detail was added successful.... Redirecting to Dashboard in 3 seconds.'
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
    const details = {
      "name": this.state.name,
      "streetAddress": this.state.streetAddress,
      "city": this.state.city,
      "state": this.state.state,
      "zipCode": this.state.zipCode,
      "sex": this.state.sex,
      "countryCode": this.state.countryCode,
      "phoneNumber": this.state.phoneNumber,
      "email": this.state.email,
      "citizenship": this.state.citizenship,
      "socialSecurityNumber": this.state.socialSecurityNumber,
      "dateOfBirth": this.state.dateOfBirth,
    }
    axios.post(`https://financial-report.herokuapp.com/api/personaldetail`, details, {
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
            <Typography component="h1" variant="h5">
                Add Personal Details
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="name">Full Name</InputLabel>
                <Input 
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="sex">Sex</InputLabel>
                <Select
                  value={this.state.sex}
                  onChange={this.onChange}
                  input={<Input name="sex" id="sex" style={{textTransform: 'capitalize'}}/>}
                >
                  {this.state.listOfSex.map((sex, i) => (
                      <MenuItem key={i} value={sex} style={{textTransform: 'capitalize'}}>{sex}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="streetAddress">Street Address</InputLabel>
                <Input 
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  placeholder="Street Address"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="state">State</InputLabel>
                <Input 
                  type="text"
                  name="state"
                  id="state"
                  placeholder="State"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="city">City</InputLabel>
                <Input 
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="zipCode">Zip code</InputLabel>
                <Input 
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  placeholder="Zip code"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="countryCode">Country Code</InputLabel>
                <Input 
                  type="text"
                  name="countryCode"
                  id="countryCode"
                  placeholder="Country Code"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                <Input 
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input 
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="citizenship">Citizenship</InputLabel>
                <Input 
                  type="text"
                  name="citizenship"
                  id="citizenship"
                  placeholder="Citizenship"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="socialSecurityNumber">Social Security Number</InputLabel>
                <Input 
                  type="text"
                  name="socialSecurityNumber"
                  id="socialSecurityNumber"
                  placeholder="Social Security Number"
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="dateOfBirth">Date of Birth</InputLabel>
                <Input 
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={this.state.dateOfBirth}
                  placeholder="Date of Birth"
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
                Save Details
              </Button>          
            </form>
          </Paper>
        </main>
    );
  }
}

PersonalDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalDetails);