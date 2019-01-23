// @flow
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import connect from 'react-redux/es/connect/connect';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { getUserInfo } from '../../store/actions/userActions';

const styles = () => ({
  sectionDesktop: {
    display: 'flex'
  }
});

type Props = {
  classes: Object,
  handleSignOut: Function
};

type State = {
  anchorEl: any,
  email: string
};

class PrimarySearchAppBar extends React.Component<Props, State> {
  state = {
    anchorEl: null,
    email: 'abc'
  };

  componentWillMount(){
    this.props.getUserInfo();
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, handleSignOut } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
          {this.props.email}
        </MenuItem>
        <Divider/>
        <MenuItem component={Link} to={'/profil'} onClick={this.handleMenuClose}>
          Profil
        </MenuItem>
        <MenuItem component={Link} to={'/innstillinger'} onClick={this.handleMenuClose}>
          Innstillinger
        </MenuItem>
        <MenuItem component={Link} to={'/'} onClick={handleSignOut}>
          Logg ut
        </MenuItem>
      </Menu>
    );
    return (
      <div className={classes.sectionDesktop}>
        <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {renderMenu}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(getUserInfo())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(PrimarySearchAppBar)));
