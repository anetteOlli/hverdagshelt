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

type Props = {
  classes: Object,
  open: any,
  onClose: any,
  popupOpen: any
};

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
};

class TemporaryDrawer extends React.Component<Props> {
  state = {
    openPopup: false
  };

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
          <ListItem button component={NavLink} to={'/map'}>
            <ListItemIcon>
              <NewIcon />
            </ListItemIcon>
            <ListItemText primary="Map" />
          </ListItem>
          <ListItem button component={NavLink} to={'/munipage'}>
            <ListItemIcon>
              <TrendingIcon />
            </ListItemIcon>
            <ListItemText primary="munipage" />
          </ListItem>
          <ListItem button component={NavLink} to={'/opprArrangement'}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Opprett Arrangement" />
          </ListItem>
          <ListItem activeClassName={classes.selected} button component={NavLink} to={'/stati'}>
            <ListItemIcon>
              <HotIcon />
            </ListItemIcon>
            <ListItemText primary="stati" />
          </ListItem>
          <ListItem button component={NavLink} to={'/problemdetails/2'}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="ProblemDetails" />
          </ListItem>
          <ListItem button component={NavLink} to={'/lagproblem'}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="lagproblem" />
          </ListItem>
          <ListItem button component={NavLink} to={'/editp'}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="editproblem" />
          </ListItem>
          <Button onClick={this.onClickCat}>
          <ListItem>

            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="Legg til kategori" />

          </ListItem>
          </Button>
        </List>
        <Divider />
        <List>
          <ListItem button component={NavLink} to={'/muiTable'}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="muiTable" />
          </ListItem>
          <ListItem button component={NavLink} to={'/lagproblem'}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="lagproblem" />
          </ListItem>
          <ListItem button component={NavLink} to={'/map_simpel'}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="map_simpel" />
          </ListItem>
          <ListItem button component={NavLink} to={'/map_simpel'}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="map_simpel" />
          </ListItem>
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

        <div>
          <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.openPopup}>
            <DialogContent>
              <h3>Legg til kategori</h3>
              <Typography gutterBottom />
              <CreateCategory onClick={e => {}} />
            </DialogContent>
            <DialogActions />
          </Dialog>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(TemporaryDrawer);
