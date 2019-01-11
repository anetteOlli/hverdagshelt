// @flow
import React from 'react';
import {
  Button,
  CardMedia,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Switch,
  Typography
} from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

type Props = {
  enqueueSnackbar: Function
};
type State = { title: string, picture: any, displayImg: string };

class Test extends React.Component<Props, State> {
  state = {
    title: '',
    picture: '',
    displayImg: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const { picture, title } = this.state;
    if (!picture) {
      this.props.enqueueSnackbar('Please upload an image', { variant: 'warning' });
      return;
    }
    /*--- Need formdata so multer module in backend can store the image ---*/
    const formData = new FormData();
    formData.append('title', title);
    formData.append('picture', picture);
    console.log(formData);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpload = e => {
    this.setState({
      picture: e.target.files[0],
      displayImg: URL.createObjectURL(e.target.files[0])
    });
  };

  render() {
    return (
      <div className="article-form">
        <Typography variant="h2" gutterBottom align="center">
          Create article
        </Typography>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
          <TextValidator
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <FormControl fullWidth margin="normal">
            <CardMedia
              image={this.state.displayImg || ''}
              title="Image title"
              style={{
                height: 0,
                paddingTop: '56.25%'
              }}
            />
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="contained-button-file">
              <Button fullWidth variant="contained" component="span">
                <CloudUploadIcon className="icon-button" />
                Upload
              </Button>
            </label>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button variant="contained" color="primary" type="submit">
              <SaveIcon className="icon-button" />
              Create article
            </Button>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button variant="contained" component={Link} to={'/'}>
              Cancel
            </Button>
          </FormControl>
        </ValidatorForm>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(withRoot(withSnackbar(Test)));
