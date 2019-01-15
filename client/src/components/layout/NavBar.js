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
import { fade } from '@material-ui/core/styles/colorManipulator';
import SideBar from './SideBar';
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
import { connect } from 'react-redux';
import { refresh, signOut } from '../../store/actions/userActions';
const styles = (theme: Object) => ({
  appBar: {
    marginBottom: 20
  },
  grow: {
    flexGrow: 1
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
  categories: string[],
  isLoggedIn: boolean,
  signOut: Function,
  refresh: Function
};

type State = {
  drawer: boolean
};

class NavBar extends React.Component<Props, State> {
  state = {
    drawer: false
  };

  handleOpen = () => {
    this.setState({
      drawer: true
    });
  };

  handleClose = () => {
    this.setState({
      drawer: false
    });
  };

  render() {
    const { classes, isLoggedIn, signOut, hasCheckedJWT } = this.props;
    return (
      <div>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <IconButton
              onClick={this.handleOpen}
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Button component={NavLink} to={'/'} color="inherit" className={classes.title}>
              HverdagsHelt
            </Button>
            <div className={classes.grow} />
            {hasCheckedJWT && isLoggedIn ? <SignedInLinks handleSignOut={signOut} /> : <SignedOutLinks />}
          </Toolbar>
        </AppBar>
        <SideBar open={this.state.drawer} onClose={this.handleClose} />
      </div>
    );
  }
  componentDidMount(): void {
    this.props.refresh();
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    hasCheckedJWT: state.app.hasCheckedJWT
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    refresh: () => dispatch(refresh())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(NavBar)));
