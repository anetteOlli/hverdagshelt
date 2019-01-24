// @flow
import React from 'react';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  root: {
    backgroundColor: 'transparent'
  },

  paper: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'hidden'
  }
};

const LoadingComponent = ({ classes }) => (
  <Dialog
    open
    BackdropProps={{
      classes: {
        root: classes.root
      }
    }}
    PaperProps={{
      classes: {
        root: classes.paper
      }
    }}
  >
    <CircularProgress />
  </Dialog>
);

export default withStyles(styles)(LoadingComponent);
