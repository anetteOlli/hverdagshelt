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
import { NavLink } from 'react-router-dom';
import EventIcon from '@material-ui/icons/event'
type Props = {
  classes: Object,
  open: any,
  onClose: any
};

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
};
const categories = ['Test', 'test'];

class TemporaryDrawer extends React.Component<Props> {
  render() {
    const { classes, open, onClose } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button component={NavLink} to={'/opprArrangement'}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Opprett Arrangement" />
          </ListItem>
          <ListItem button component={NavLink} to={'/browse/trending'}>
            <ListItemIcon>
              <TrendingIcon />
            </ListItemIcon>
            <ListItemText primary="Trending" />
          </ListItem>
          <ListItem activeClassName={classes.selected} button component={NavLink} to={'/browse/popular'}>
            <ListItemIcon>
              <HotIcon />
            </ListItemIcon>
            <ListItemText primary="Most Popular" />
          </ListItem>
          <ListItem button component={NavLink} to={'/tests'}>
            <ListItemIcon>
              <SettingIcon />
            </ListItemIcon>
            <ListItemText primary="Tests components" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {categories &&
            categories.map((category, index) => (
              <ListItem button component={NavLink} to={`/browse/${category}`} key={index}>
                <ListItemIcon>
                  <NewIcon />
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItem>
            ))}
        </List>
      </div>
    );
    return (
      <Drawer open={open} onClose={onClose}>
        <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
          {sideList}
        </div>
      </Drawer>
    );
  }
}
export default withStyles(styles)(TemporaryDrawer);
