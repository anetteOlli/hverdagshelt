// @flow
import React from 'react';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class MainPage extends React.Component {
  render() {
    return (
      <main>
        <div>Test</div>
      </main>
    );
  }
}

export default withRoot(withStyles(styles)(MainPage));
