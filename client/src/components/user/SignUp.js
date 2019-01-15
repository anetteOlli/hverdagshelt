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
  Select
} from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { signUp } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { validateEmail } from '../../store/util';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

type Props = {
  classes: Object,
  isLoggedIn: boolean,
  signUp: Function,
  enqueueSnackbar: Function,
  categories: string[]
};

type State = {
  muni: string,
  entrepreneurName: string,
  email: string,
  password: string,
  cnfPassword: string,
  showPassword: boolean,
  isUniqueEmail: boolean,
  isEntrepreneur: boolean,
  entrepreneurCategories: string[],
  entrepreneurMuni: string[]
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

class SignUp extends React.Component<Props, State> {
  state = {
    muni: '',
    email: '',
    password: '',
    cnfPassword: '',
    showPassword: false,
    isUniqueEmail: false,
    isEntrepreneur: false,
    entrepreneurName: '',
    entrepreneurCategories: [],
    entrepreneurMuni: []
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
    const { muni, email, password } = this.state;
    console.log(this.state);
    this.props
      .signUp({
        muni,
        email,
        password
      })
      .then(() => this.props.enqueueSnackbar(' U in', { variant: 'success' }));
  };

  handleValidateEmail = () => {
    validateEmail(this.state.email).then(response =>
      this.setState({
        isUniqueEmail: !response.data.emailExist
      })
    );
  };
  /*
          <SelectValidator
          fullWidth
          margin="normal"
          multiple
          label="Kommuner entrepenøren jobber i lol:"
          name="entrepreneurMuni"
          value={this.state.entrepreneurMuni}
          onChange={this.handleChange}
          renderValue={selected => selected.join(', ')}
          validators={['required']}
          errorMessages={['Feltet kan ikke være tomt']}
        >
          {categories.map((name: string) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={this.state.entrepreneurMuni.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </SelectValidator>
   */

  render() {
    const { classes, isLoggedIn, categories } = this.props;
    const EntrepenurSignUp = (
      <div>
        <TextValidator
          fullWidth
          margin="normal"
          label="Entrepenør navn"
          name="entrepreneurName"
          autoComplete="organization"
          value={this.state.entrepreneurName}
          onChange={this.handleChange}
          validators={['required']}
          errorMessages={['Feltet kan ikke være tomt']}
        />

        <FormControl fullWidth margin="normal" className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Kommuner entrepenøren jobber i lol:</InputLabel>
          <Select
            multiple
            value={this.state.entrepreneurMuni}
            name="entrepreneurMuni"
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {categories.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.entrepreneurMuni.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <SelectValidator
          fullWidth
          margin="normal"
          multiple
          label="Kommuner entrepenøren jobber i lol:"
          name="entrepreneurCategories"
          value={this.state.entrepreneurCategories}
          onChange={this.handleChange}
          validators={['required']}
          errorMessages={['Feltet kan ikke være tomt']}
        >
          {categories.map((name: string) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </SelectValidator>
      </div>
    );
    if (isLoggedIn) return <Redirect to="/" />;
    return (
      <div className={classes.main}>
        <Typography variant="h2" gutterBottom align="center">
          Register ny bruker
        </Typography>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
          <SelectValidator
            fullWidth
            margin="normal"
            label="Muni:"
            name="muni"
            value={this.state.muni}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
          >
            {categories.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </SelectValidator>
          <TextValidator
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleChange}
            onBlur={this.handleValidateEmail}
            validators={['required', 'isEmail', 'isUniqueEmail']}
            errorMessages={['Feltet kan ikke være tomt', 'Ugyldig epost-adresse', 'Epost-adressen finnes fra før']}
          />
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
          <Button fullWidth variant="contained" className={classes.button} type="submit">
            Register
          </Button>
          <Button fullWidth variant="contained" className={classes.button} color="secondary" component={Link} to={'/'}>
            Cancel
          </Button>
          {EntrepenurSignUp}
        </ValidatorForm>
      </div>
    );
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => value === this.state.password);
    ValidatorForm.addValidationRule('isUniqueEmail', () => !this.state.isUniqueEmail);
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    categories: state.category.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles, { withTheme: true })(withSnackbar(SignUp))));
