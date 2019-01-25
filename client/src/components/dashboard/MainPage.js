// @flow
import React from 'react';
import {
  withStyles,
  Card,
  CardContent,
  Paper,
  Chip,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
  NoSsr
} from '@material-ui/core';
import Select from 'react-select';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { getMunicipalities } from '../../store/actions/muniActions';
import { connect } from 'react-redux';
import type { Dispatch, ReduxState } from '../../store/reducers';

/**
 * @fileOverview overview page for events and problems
 * @author Elisabeth Marie Opsahl
 */

/**Props og State*/
type Props = {
  classes: Object
};
type State = {
  municipality: string,
  municipalities: [],
  single: string
};

/**Styling*/
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  tittel: {
    marginButtom: 30,
    marginTop: 30,
    [theme.breakpoints.down('lg')]: {
      fontSize: '150%'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '300%'
    }
  },
  tekst: {
    size: 5,
    marginTop: 50
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    fullWidth: true
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: 50,
    marginBottom: 50,
    size: 200
    //padding: 30
  },
  // input: {
  //   display: 'none'
  // }
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08)
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

/**Function handeling the select searchfield no options message
 *@return a message
 *@params props
 */
function NoOptionsMessage(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

/**Function handeling the select searchfield inputcomponent
 *@return a div
 *@params inputreferance
 *@params props
 */
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

/**Function handeling the select searchfield props
 *@return a textfield
 *@params props
 */
function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

/**Function handeling the select searchfield options
 *@return a menuItem of the options
 *@params props
 */
function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

/**Function handeling the select searchfield placeholder
 *@return a placeholder
 *@params props
 */
function Placeholder(props) {
  return (
    <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

/**Function handeling the select searchfield input-value
 *@return text
 *@params props
 */
function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

/**Function handeling the select searchfield valuecontainer
 *@return a div
 *@params props
 */
function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

/**Function handling the select searchfield menu
 *@return a paper container with the menu
 *@params props
 */
function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

/* components of the select searchfield*/
const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class MainPage extends React.Component<Props, State> {
  state = {
    municipality: '',
    single: null,
    municipalities: ['Default'],
    isLoggedIn: false
  };
  render() {
    const { classes, municipalities } = this.props;
    return (
      <main>
        <Grid container spacing={24}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h3" className={classes.tittel}>
                  VELKOMMEN TIL HVERDAGSHELT!
                </Typography>
                <br />
                <br />
                <Button variant="contained" color="primary" size="large" onClick={this.registerProblem}>
                  Registrer et problem
                </Button>
                <Typography variant="h5" className={classes.tekst}>
                  Eller
                </Typography>
                <Typography variant="h5" className={classes.tekst}>
                  Finn arrangementer og problemer i din kommune
                </Typography>
                <NoSsr>
                  <Select
                    label="Velg din kommune"
                    classes={classes}
                    options={municipalities}
                    components={components}
                    value={this.state.municipality}
                    onChange={this.handleChange('single')}
                    placeholder="Velg din kommune"
                    isClearable
                  />
                </NoSsr>
                {this.props.isLoggedIn ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    className={classes.button}
                    onClick={() =>
                      this.props.history.push(`${this.props.userMuni.county}/${this.props.userMuni.municipality}`)
                    }
                  >
                    Ta meg til min kommune
                  </Button>
                ) : (
                  <div >
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                )}
                <br />
                <br />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </main>
    );
  }

  /** User will be pushed to the chosen municipality page */
  handleChange = name => value => {
    this.setState({
      [name]: value
    });
    this.props.history.push(value.value);
  };

  /**User will be pushed to the registerProblem page */
  registerProblem = () => {
    this.props.history.push('/lagproblem');
  };

  /**Mount the municipalities from database*/
  componentWillMount() {
    this.props.getMunicipalities();
  }

  /** Gets ALL problem categories*/
  // getMunicipalities(){
  //   let municipalities = this.props.municipalities;
  //   if(municipalities != null){
  //     this.setState({
  //       getMunicipalities: municipalities
  //     });
  //     municipalities.map(municipality => ({
  //       value: municipality.municipality,
  //       label: municipality.municipality,
  //     }));
  //   }
  // }
} //class

const mapStateToProps = (state: ReduxState) => {
  const municipalitiesFromRedux = state.municipality.municipalities;
  const municipalities = municipalitiesFromRedux
    ? municipalitiesFromRedux.map(municipality => {
        const value = `${municipality.county}/${municipality.municipality}`;
        const label = `${municipality.municipality} i  ${municipality.county}`;
        return { value, label };
      })
    : null;
  return {
    municipalities: municipalities,
    isLoggedIn: state.user.isLoggedIn,
    userMuni: state.user.currentMuni
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getMunicipalities: () => dispatch(getMunicipalities())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MainPage));
