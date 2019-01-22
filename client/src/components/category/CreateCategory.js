import React from 'react';
import withRoot from '../../withRoot';
import connect from 'react-redux/es/connect/connect';
import { createCategory } from '../../store/actions/categoryActions';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField/TextField';
import { withSnackbar } from 'notistack';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import { Typography } from '@material-ui/core';

const variantIcon = {
  success: CheckCircleIcon
};

const styles = (theme: Object) => ({
  wrapper: {
    minWidth: 300,
    minHeight: 250,
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: '100%'
  },
  sendInnBtn: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    minWidth: '100%'
  },
  closeBtn: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    minWidth: '100%'
  }
});

class CreateCategory extends React.Component<Props, State> {
  state = {
    category: ''
  };

  handleClick = () => {
    const vals = {
      category: this.state.category
    };

    this.props.createCategory(vals).then(respone => {
      if (respone.type === 'CREATE_CATEGORY_ERROR') this.props.enqueueSnackbar('Noe gikk galt', { variant: 'error' });
      else
        this.props.enqueueSnackbar(`'${this.state.category}' added to categories.`, {
          variant: 'success'
        });
      this.props.onClose();
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog onClose={this.props.onClose} aria-labelledby="customized-dialog-title" open={this.props.open}>
        <DialogContent>
          <Typography gutterBottom />
          <div className={classes.wrapper}>
            <h2 className={classes.textField}>Legg til ny kategori</h2>

            <TextField
              id="outlined-with-placeholder"
              label="Kategori"
              placeholder="Ny kategori"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              name="category"
              onChange={this.handleChange}
            />
            <Button onClick={this.handleClick} variant="contained" color="primary" className={classes.sendInnBtn}>
              Send inn
            </Button>
            <Button onClick={this.props.onClose} variant="contained" color="secondary" className={classes.sendInnBtn}>
              Avbryt
            </Button>
          </div>
        </DialogContent>
        <DialogActions />
      </Dialog>
    );
  }
  componentDidMount() {}
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory: vals => dispatch(createCategory(vals))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRoot(withStyles(styles)(withSnackbar(CreateCategory))));
