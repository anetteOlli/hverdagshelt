import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from '../../store/actions/notifyActions';
import type { ReduxState } from '../../store/reducers';

class Notifier extends React.Component {
  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i++) {
      if (notExists) continue;
      notExists = notExists || !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;

    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbar(notification.message, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.removeSnackbar(notification.key);
    });
  }
  render() {
    return null;
  }
}

const mapStateToProps = (store: ReduxState) => ({
  notifications: store.notify.notifications
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Notifier));
