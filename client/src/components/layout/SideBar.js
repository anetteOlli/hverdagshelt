// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NewIcon from '@material-ui/icons/NewReleases';
import HotIcon from '@material-ui/icons/Whatshot';
import SettingIcon from '@material-ui/icons/Settings';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import EventIcon from '@material-ui/icons/Event';
import { NavLink } from 'react-router-dom';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import { Typography } from '@material-ui/core';
import SelectTable2 from '../util/SelectTable2';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Dialog from '@material-ui/core/Dialog/Dialog';
import CreateCategory from '../category/CreateCategory';
import Button from '@material-ui/core/Button/Button';
import connect from 'react-redux/es/connect/connect';
import withRoot from '../../withRoot';
import { withSnackbar } from 'notistack';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import Folder from '@material-ui/icons/Folder';

type Props = {
  classes: Object,
  open: any,
  onClose: any,
  popupOpen: any
};

const styles = {};

class TemporaryDrawer extends React.Component<Props> {
  state = {
    openPopup: false,
    visible: false,
    createEventVisible: false
  };

  toggleButtonVisible() {
    this.setState({
      visible: true
    });
  }
  toggleButtonHidden() {
    this.setState({
      visible: false
    });
  }

  checkUser(user) {
    if (user === 'Administrator') {
      this.toggleButtonVisible();
      return true;
    } else if(user === 'Municipality'){
      this.setState({
        createEventVisible: true
      });
    } else {
      this.toggleButtonHidden();
      return false;
    }
  }

  onClickCat = () => {
    this.handleClickOpen();
  };

  handleClickOpen = () => {
    this.setState({
      openPopup: true
    });
  };

  handleClose = () => {
    this.setState({ openPopup: false });
  };

  render() {
    const { classes, open, onClose } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button component={NavLink} to={'/'}>
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Hovedsiden" />
          </ListItem>
          <Divider />
          <ListItem button component={NavLink} to={'/stati'}>
            <ListItemIcon>
              <HotIcon />
            </ListItemIcon>
            <ListItemText primary="Statestikk" />
          </ListItem>
          <ListItem button component={NavLink} to={'/problems'}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Problem Oversikt" />
          </ListItem>
          <ListItem button component={NavLink} to={'/lagproblem'}>
            <ListItemIcon>
              <AddCircleOutlined />
            </ListItemIcon>
            <ListItemText primary="Registrer Problem" />
          </ListItem>
          <ListItem button component={NavLink} to={'/editp'}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="Rediger Problem" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {this.state.createEventVisible ? (
            <ListItem button component={NavLink} to={'/opprArrangement'}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Opprett Arrangement" />
            </ListItem>
          ) : (<div/>)}
          {this.state.visible && (
            <Button onClick={this.onClickCat}>
              <ListItem>
                <ListItemIcon>
                  <SettingIcon />
                </ListItemIcon>
                <ListItemText primary="Legg til kategori" />
              </ListItem>
            </Button>
          )}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={open} onClose={onClose}>
          <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
            {sideList}
          </div>
        </Drawer>
        <CreateCategory onClose={this.handleClose} open={this.state.openPopup} />
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.checkUser(this.props.priority);
  }
}

const mapStateToProps = state => {
  return {
    priority: state.user.priority
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(TemporaryDrawer))));
