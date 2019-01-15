// @flow
import React from 'react';
import {Button, FormControl} from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import withRoot from '../../withRoot';
import { withStyles } from '@material-ui/core';
import Divider from "@material-ui/core/Divider/Divider";

type Props = {
  enqueueSnackbar: Function
};
type State = { title: string, picture: any, displayImg: string };

class Test extends React.Component<Props, State> {
  state = {
    title: '',
    picture: '',
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
    });
    this.props.uploadImg(URL.createObjectURL(e.target.files[0]));
  };


  render() {
    return (
      <div className="article-form">
        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>

          <FormControl fullWidth margin="normal">
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUpload}
              style={{ display: 'none' }}
            />
            <Divider/>
            <label htmlFor="contained-button-file">
              <Button fullWidth variant="contained" component="span">
                <CloudUploadIcon className="icon-button" />
                Upload
              </Button>
            </label>

          </FormControl>
          <FormControl fullWidth margin="normal">
          </FormControl>
          <FormControl fullWidth margin="normal">
          </FormControl>
        </ValidatorForm>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

// $FlowFixMe
export default connect(
  null,
  mapDispatchToProps
)(withRoot(withSnackbar(Test)));
