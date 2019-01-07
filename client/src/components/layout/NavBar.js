// @flow
import React from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import withRoot from '../../withRoot';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import SideBar from './SideBar';

const styles = (theme: Object) => ({
  root: {
    width: '100%'
  },
  appBar: {
    marginBottom: 20
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    margin: theme.spacing.unit
  }
});

type Props = {
  classes: Object,
  categories: string[]
};

type State = {
  loginForm: boolean,
  drawer: boolean
};

class NavBar extends React.Component<Props, State> {
  state = {
    loginForm: false,
    drawer: false
  };

  handleOpen = name => () => {
    this.setState({
      [name]: true
    });
  };

  handleClose = name => () => {
    this.setState({
      [name]: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <IconButton
              onClick={this.handleOpen('drawer')}
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Button component={NavLink} to={'/'} variant="h6" color="inherit" noWrap className={classes.title}>
              HverdagsHelt
            </Button>
          </Toolbar>
        </AppBar>
        <SideBar open={this.state.drawer} onClose={this.handleClose('drawer')} />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(NavBar));
