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
import { withStyles, Card, CardContent } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { setNewPassword, getUserInfo } from '../../store/actions/userActions';
import { getCounties, getMunicipalitiesByCounty } from '../../store/actions/muniActions';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { postData } from '../../store/axios';
import { getData } from '../../store/axios';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * @fileOverview changePassword component
 * @author Anette Olli Siiri
 */

type Props = {
  classes: Object,
  isLoggedIn: boolean,
  enqueueSnackbar: Function,
  errorMessage: string,
  getUserInfo: Function,
  password: string,
  email: string,
  user_id: number,
  setNewPassword: Function,
  history: Function
};

type State = {
  email: string,
  password: string,
  cnfPassword: string,
  showPassword: boolean,
  user_id: number,
  successDialog: boolean,
  isOldPassword: boolean,
  failureDialog: boolean,
  loading: boolean
};

const styles = (theme: Object) => ({
  main: {
    margin: 20,
    padding: 20,
    textAlign: 'center'
  },
  button: {
    marginTop: theme.spacing.unit
  },
  progress: {
    width: '50%'
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

/**
 * changePassword component
 */
class ChangePassword extends React.Component<Props, State> {
  state = {
    email: '',
    password: '',
    cnfPassword: '',
    user_id: -1,
    showPassword: false,
    successDialog: false,
    isOldPassword: false,
    failureDialog: false,
    loading: false
  };

  /** handles input from the user, and sets new state*/
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /** toggles whether or not password should be visible for the user in plain text or not*/
  handleVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  /**
   * updates the database
   */
  handleSubmit = e => {
    e.preventDefault();
    const { email, user_id, password } = this.state;

    this.setState({
      loading: true
    });

    /** checks whether new password is identical to old password, and if so gives the user an
     * errorDialog box.
     * if password is not identical to old password, it will update database and give the user a
     * confirm dialog and redirect user to the front page
     */
    postData('users/check_pass', { email: this.props.email, password }).then(response => {
      console.log(response.data);
      this.setState({
        isOldPassword: response.data.isOldPassword
      });

      if (this.state.isOldPassword) {
        this.setState({
          failureDialog: true,
          loading: false
        });
      } else {
        console.log(
          'INNI ChangePassword',
          this.state.user_id,
          this.state.password,
          this.state.email,
          'LOCAL VAR',
          user_id,
          password,
          email
        );
        this.props.setNewPassword(this.props.user_id, password, this.props.email).then(() => {
          if (this.props.errorMessage) this.props.enqueueSnackbar(this.props.errorMessage, { variant: 'error' });
          else {
            this.setState({
              successDialog: true,
              loading: false
            });
          }
        });
      }
    });
  };

  /** closes the successDialog and sends the user to the front page */
  handleSuccessDialogClose = () => {
    this.setState({
      successDialog: false
    });
    this.props.history.push('/');
  };

  /** closes the failureDialog */
  handleFailureDialogClose = () => {
    this.setState({
      failureDialog: false
    });
  };

  //if the user !isLoggedIn, it will only show a div
  render() {
    const { classes, isLoggedIn, email, user_id, password } = this.props;

    const form = (
      <div className={classes.main}>
        <Card align="center">
          <CardContent>
            <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
              <TextValidator
                fullWidth
                margin="normal"
                label="Nytt passord"
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
                label="Bekreft passord"
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
              {this.state.loading && <CircularProgress size={24} className={classes.progress} />}
            </ValidatorForm>
          </CardContent>
        </Card>
        <Dialog
          open={this.state.successDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Du har nå endret passord'}</DialogTitle>

          <DialogActions>
            <Button onClick={this.handleSuccessDialogClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.failureDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Nytt passord kan ikke være likt gammelt passord'}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleFailureDialogClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

    return isLoggedIn ? form : <div />;
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => value === this.state.password);
    ValidatorForm.addValidationRule('isOldPassword', () => !this.state.isOldPassword);
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    errorMessage: state.user.errorMessage,
    user_id: state.user.user_id,
    email: state.user.email,
    isLoading: state.async.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setNewPassword: (user_id, password, email) => dispatch(setNewPassword(user_id, password, email)),
    getUserInfo: () => dispatch(getUserInfo())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(withSnackbar(ChangePassword))));
