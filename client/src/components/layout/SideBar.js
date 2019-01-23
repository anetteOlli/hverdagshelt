// @flow
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HotIcon from '@material-ui/icons/Whatshot';
import SettingIcon from '@material-ui/icons/Settings';
import EventIcon from '@material-ui/icons/Event';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import CreateCategory from '../category/CreateCategory';
import Button from '@material-ui/core/Button/Button';
import connect from 'react-redux/es/connect/connect';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import Folder from '@material-ui/icons/Folder';

type Props = {
  classes: Object,
  open: boolean,
  onClose: () => void,
  priority: string
};

type State = {
  openPopup: boolean
};

class TemporaryDrawer extends React.Component<Props, State> {
  state = {
    openPopup: false
  };

  handleOpenCat = () => {
    this.setState({
      openPopup: true
    });
  };
  handleCloseCat = () => {
    this.setState({ openPopup: false });
  };

  render() {
    const { open, onClose, priority } = this.props;
    const sideList = (
      <div>
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
          {priority === 'Municipality' && (
            <ListItem button component={NavLink} to={'/opprArrangement'}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Opprett Arrangement" />
            </ListItem>
          )}
          {priority === 'Administrator' && (
            <Button onClick={this.handleOpenCat}>
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
        <CreateCategory onClose={this.handleCloseCat} open={this.state.openPopup} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    priority: state.user.priority
  };
};

export default connect(mapStateToProps)(TemporaryDrawer);
