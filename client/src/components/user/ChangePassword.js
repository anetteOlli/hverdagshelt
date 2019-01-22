// @flow
import React from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch
} from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { setNewPassword, getUserInfo } from '../../store/actions/userActions';
import { getCounties, getMunicipalitiesByCounty } from '../../store/actions/muniActions';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { postData } from '../../store/axios';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

type Props = {
  classes: Object,
  isLoggedIn: boolean,
  enqueueSnackbar: Function,
  errorMessage: string,
  getUserInfo: Function,
  password: string,
  email: string,
  userID: number
};

type State = {
  email: string,
  password: string,
  cnfPassword: string,
  showPassword: boolean
};

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20
  },
  button: {
    marginTop: theme.spacing.unit
  }
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class ChangePassword extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    cnfPassword: '',
    userID: '',
    showPassword: false
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const { email, userID, password } = this.state;
    console.log(this.state);
  };

  render() {
    const { classes, isLoggedIn, email, userID, password } = this.props;
    const form = (
      <div className={classes.main}>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
          <TextValidator
            fullWidth
            margin="normal"
            label="New password"
            name="password"
            autoComplete="new-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange}
            validators={['required', 'minStringLength:6']}
            errorMessages={['Feltet kan ikke være tomt', 'Passordet må være lenger']}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility" onClick={this.handleVisibility}>
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextValidator
            fullWidth
            margin="normal"
            label="Confirm password"
            name="cnfPassword"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.cnfPassword}
            onChange={this.handleChange}
            validators={['required', 'isPasswordMatch']}
            errorMessages={['Feltet kan ikke være tomt', 'Passordene er ikke like']}
          />
          <Button fullWidth color="primary" variant="contained" className={classes.button} type="submit">
            Endre passord
          </Button>
          <Button fullWidth variant="contained" className={classes.button} color="secondary" component={Link} to={'/'}>
            Cancel
          </Button>
        </ValidatorForm>
      </div>
    );

    return isLoggedIn ? form : <div />;
  }
  componentDidMount() {
    this.props.getUserInfo().then(() => {
      console.log('this.props in componentDidMount', this.props, 'this.state', this.state);
    });
    ValidatorForm.addValidationRule('isPasswordMatch', value => value === this.state.password);
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    errorMessage: state.user.errorMessage,
    userID: state.user.userID,
    email: state.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNewPassword: (userId, password) => dispatch(setNewPassword(userId, password)),
    getUserInfo: () => dispatch(getUserInfo())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(ChangePassword)));
