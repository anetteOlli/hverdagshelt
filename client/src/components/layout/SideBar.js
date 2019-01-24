// @flow
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import CreateCategory from '../category/CreateCategory';
import connect from 'react-redux/es/connect/connect';
import HomeOutlined from '@material-ui/icons/Home';
import AddCircleOutlined from '@material-ui/icons/AddCircleOutlined';
import Folder from '@material-ui/icons/Folder';
import Stati from '@material-ui/icons/BarChart';

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
          <ListItem button component={Link} to={'/'}>
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Hovedsiden" />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to={'/problemoversikt'}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Problemoversikt" />
          </ListItem>
          <ListItem button component={Link} to={'/lagproblem'}>
            <ListItemIcon>
              <AddCircleOutlined />
            </ListItemIcon>
            <ListItemText primary="Registrer Problem" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {(priority === 'Municipality' || priority === 'Administrator' ) && (
            <div>
            <ListItem button component={Link} to={'/opprArrangement'}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Opprett Arrangement" />
            </ListItem>
            <ListItem button component={Link} to={'/stati'}>
              <ListItemIcon>
                <Stati />
              </ListItemIcon>
              <ListItemText primary="Statistikk" />
            </ListItem>
            </div>
          )}
          {priority === 'Administrator' && (
              <ListItem button onClick={this.handleOpenCat}>
                  <ListItemIcon>
                    <AddCircleOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Legg til kategori" />
              </ListItem>
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
