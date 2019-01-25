// @flow
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import connect from 'react-redux/es/connect/connect';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

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
    email: ''
  };

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
        <MenuItem>{this.props.email}</MenuItem>
        <Divider />
        <MenuItem component={Link} to={'/innstillinger'} onClick={this.handleMenuClose}>
          Endre passsord
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

export default connect(
  mapStateToProps
)(withStyles(styles)(PrimarySearchAppBar));
