import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { createCategory } from '../../store/actions/categoryActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import { Typography } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { enqueueSnackbar } from '../../store/actions/notifyActions';

const styles = (theme: Object) => ({
  wrapper: {
    minWidth: 300,
    minHeight: 200,
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

/** CreateCategory component **/

class CreateCategory extends React.Component<Props, State> {
  state = {
    category: ''
  };

  /** Submits a new category to category table. If it passes validator
   * requirements it will show a snackbar showing the result of the query. **/

  handleSubmit = e => {
    e.preventDefault();
    const vals = {
      category: this.state.category
    };
    this.props.createCategory(vals).then(response => {
      if (response.type === 'CREATE_CATEGORY_ERROR') this.props.enqueueSnackbar('Noe gikk galt', 'error');
      else this.props.enqueueSnackbar(`'${this.state.category}' added to categories.`, 'success');
      this.props.onClose();
    });
  };


  /** Sets state like input value **/
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
          <ValidatorForm onSubmit={this.handleSubmit}>
            <div className={classes.wrapper}>
              <Typography variant="h5" className={classes.textField}>Legg til ny kategori</Typography>

              <TextValidator
                className={classes.textField}
                label="Ny kategori"
                margin="normal"
                name="category"
                onChange={this.handleChange}
                validators={['required', 'minStringLength:3']}
                errorMessages={['Teksten må være lengere']}
              />

              <Button type="submit" variant="contained" color="primary" className={classes.sendInnBtn}>
                Send inn
              </Button>
              <Button onClick={this.props.onClose} variant="contained" color="secondary" className={classes.sendInnBtn}>
                Avbryt
              </Button>
            </div>
          </ValidatorForm>
        </DialogContent>
        <DialogActions />
      </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCategory: vals => dispatch(createCategory(vals)),
    enqueueSnackbar: (message: string, type: string) => dispatch(enqueueSnackbar(message, type))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CreateCategory));
