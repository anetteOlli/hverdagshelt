// @flow
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { signUpUser, signUpEntrepreneur } from '../../store/actions/userActions';
import { getCounties, getMunicipalitiesByCounty } from '../../store/actions/muniActions';
import { getCategories } from '../../store/actions/categoryActions';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getData } from '../../store/axios';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

type Props = {
  classes: Object,
  isLoggedIn: boolean,
  signUpUser: Function,
  signUpEntrepreneur: Function,
  enqueueSnackbar: Function,
  categories: string[],
  counties: string[],
  currentMunicipalities: string[],
  errorMessage: string,
  getCounties: Function,
  getMunicipalitiesByCounty: Function,
  history: Function,
  getCategories: Function
};

type State = {
  municipality: string,
  county: string,
  entrepreneurName: string,
  email: string,
  password: string,
  cnfPassword: string,
  showPassword: boolean,
  isUniqueEmail: boolean,
  org_nr: number,
  isEntrepreneur: boolean,
  entrepreneurMunies: string[],
  entrepreneurCategories: string[],
  isUniqueOrgNr: boolean,
  successDialog: boolean
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
    municipality: '',
    county: '',
    email: '',
    password: '',
    cnfPassword: '',
    showPassword: false,
    isUniqueEmail: false,
    isEntrepreneur: false,
    entrepreneurName: '',
    entrepreneurMunies: [],
    entrepreneurCategories: [],
    isUniqueOrgNr: false,
    org_nr: 0,
    successDialog: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCountyChange = e => {
    this.setState({
      county: e.target.value,
      municipality: '',
      entrepreneurMunies: []
    });
    this.props.getMunicipalitiesByCounty(e.target.value);
  };

  handleChecked = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      municipality,
      county,
      email,
      password,
      isEntrepreneur,
      entrepreneurMunies,
      entrepreneurCategories,
      entrepreneurName,
      org_nr
    } = this.state;
    if (!isEntrepreneur)
      this.props
        .signUpUser({
          municipality: municipality,
          county,
          email,
          password
        })
        .then(() => {
          if (this.props.errorMessage) this.props.enqueueSnackbar(this.props.errorMessage, { variant: 'error' });
          else {
            this.props.enqueueSnackbar('Bruker laget!', { variant: 'success' });
            this.setState({
              successDialog: true
            });
          }
        });
    else {
      this.props
        .signUpEntrepreneur(
          { municipality: 'Trondheim', county: 'Trøndelag', email, password },
          {
            business_name: entrepreneurName,
            org_nr: org_nr,
            municipalities: entrepreneurMunies.map(name => {
              return { county, municipality: name };
            }),
            categories: entrepreneurCategories
          }
        )
        .then(() => {
          if (this.props.errorMessage) this.props.enqueueSnackbar(this.props.errorMessage, { variant: 'error' });
          else {
            this.props.enqueueSnackbar('Entreprenørbruker laget!', { variant: 'success' });
            this.setState({
              successDialog: true
            });
          }
        });
    }
  };

  handleValidateEmail = () => {
    getData(`users/validate_email/${this.state.email}`).then(response => {
      const email = this.state.email;
      this.setState({
        isUniqueEmail: response.data.emailExist,
        email: email + ' '
      });
      this.setState({
        email: email
      });
    });
  };

  handleValidateOrgNr = () => {
    getData(`entrepreneurs/validate_org_nr/${this.state.org_nr}`).then(response => {
      console.log(response);
      const org_nr = this.state.org_nr;
      this.setState({
        isUniqueOrgNr: response.data.orgNrExist,
        org_nr: org_nr + ' '
      });
      this.setState({
        org_nr: org_nr
      });
    });
  };

  handleSuccessDialogClose = () => {
    this.props.history.push('/');
  };

  render() {
    const { classes, isLoggedIn } = this.props;
    const muniNotReady = this.state.county === '';
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
        <FormControl fullWidth margin="normal" className={classes.formControl} disabled={muniNotReady}>
          <InputLabel htmlFor="municipality-checkbox">Kommuner entrepenøren jobber i:</InputLabel>
          <Select
            multiple
            value={this.state.entrepreneurMunies}
            name="entrepreneurMunies"
            onChange={this.handleChange}
            input={<Input id="municipality-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.currentMunicipalities.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.entrepreneurMunies.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" className={classes.formControl}>
          <InputLabel htmlFor="category-checkbox">Kategorier entrepenøren jobber innenfor:</InputLabel>
          <Select
            multiple
            value={this.state.entrepreneurCategories}
            name="entrepreneurCategories"
            onChange={this.handleChange}
            input={<Input id="category-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.categories.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.entrepreneurCategories.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextValidator
          fullWidth
          margin="normal"
          label="Org nr"
          name="org_nr"
          value={this.state.org_nr}
          onChange={this.handleChange}
          onBlur={this.handleValidateOrgNr}
          validators={['required', 'isNumber', 'isUniqueOrgNr']}
          errorMessages={['Feltet kan ikke være tomt', 'Feltet må være ett tall', 'Org nummeret finnes fra før']}
        />
      </div>
    );
    if (isLoggedIn) return <Redirect to="/" />;
    return (
      <div className={classes.main}>
        <Typography variant="h2" gutterBottom align="center">
          Registrer ny bruker
        </Typography>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
          <SelectValidator
            fullWidth
            margin="normal"
            label="Fylke: "
            name="county"
            value={this.state.county}
            onChange={this.handleCountyChange}
            validators={['required']}
            errorMessages={['this field is required']}
          >
            {this.props.counties.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </SelectValidator>
          <SelectValidator
            disabled={muniNotReady}
            fullWidth
            margin="normal"
            label="Kommune: "
            name="municipality"
            value={this.state.municipality}
            onChange={this.handleChange}
            validators={['required']}
            errorMessages={['this field is required']}
          >
            {this.props.currentMunicipalities.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </SelectValidator>
          <TextValidator
            fullWidth
            margin="normal"
            label="E-post adresse"
            name="email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleChange}
            onBlur={this.handleValidateEmail}
            validators={['required', 'isEmail', 'isUniqueEmail']}
            errorMessages={['Feltet kan ikke være tomt', 'Ugyldig e-post adresse', 'E-post adressen finnes fra før']}
          />
          <TextValidator
            fullWidth
            margin="normal"
            label="Passord"
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
                  <Tooltip title="Vis passord">
                    <IconButton aria-label="Toggle password visibility" onClick={this.handleVisibility}>
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
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
          <FormControlLabel
            control={
              <Switch
                checked={this.state.isEntrepreneur}
                name="isEntrepreneur"
                onChange={this.handleChecked}
                color="primary"
              />
            }
            label="Er du entreprenør?"
          />
          {this.state.isEntrepreneur && EntrepenurSignUp}
          <Button fullWidth color="primary" variant="contained" className={classes.button} type="submit">
            Registrer
          </Button>
          <Button fullWidth variant="contained" className={classes.button} color="secondary" component={Link} to={'/'}>
            Avbryt
          </Button>
        </ValidatorForm>
        <Dialog
          open={this.state.successDialog}
          onClose={this.handleSuccessDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Du har nå lagd en bruker'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Gå til din e-post adresse på {this.state.email} for å logge inn.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSuccessDialogClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => value === this.state.password);
    ValidatorForm.addValidationRule('isUniqueEmail', () => !this.state.isUniqueEmail);
    ValidatorForm.addValidationRule('isUniqueOrgNr', () => !this.state.isUniqueOrgNr);
    this.props.getCounties();
    this.props.getCategories();
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    errorMessage: state.user.errorMessage,
    categories: state.category.categories,
    currentMunicipalities: state.municipality.currentMunicipalities,
    counties: state.municipality.counties
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUpUser: newUser => dispatch(signUpUser(newUser)),
    signUpEntrepreneur: (newUser, newEntrepreneur) => dispatch(signUpEntrepreneur(newUser, newEntrepreneur)),
    getCounties: () => dispatch(getCounties()),
    getMunicipalitiesByCounty: (county: string) => dispatch(getMunicipalitiesByCounty(county)),
    getCategories: () => dispatch(getCategories())
  };
};

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withSnackbar(SignUp)));
